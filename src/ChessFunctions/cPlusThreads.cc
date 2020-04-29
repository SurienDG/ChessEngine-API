
#include <napi.h>
#include "napi-thread-safe-callback.hpp"
#include <chrono>
#include <thread>

Napi::Promise threads(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    Napi::HandleScope scope(env);
    Napi::Promise::Deferred test = new Napi::Promise::Deferred(env);
    Napi::ThreadSafeFunction testing = Napi::ThreadSafeFunction::New(
        env,
        Napi::Function::New(env,[](const Napi::CallbackInfo& cbinfo) {
            Napi::HandleScope scope(cbinfo.Env());
            test->Resolve(Napi::String::New(cbinfo.Env(), "test"));
            return cbinfo.Env().Undefined();
        }),
        test
        ,
        "test", 0, 1);

    std::thread([&test = testing]() {
        std::this_thread::sleep_for (std::chrono::seconds(5));
        test.BlockingCall( [](Napi::Env env, Napi::Function jsCallback) {
                // Transform native data into JS data, passing it to the
                // provided `jsCallback` -- the TSFN's JavaScript function.
                jsCallback.Call({});

            });
            test.Release();
    }).detach();

    return test->Promise();
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
    exports.Set(Napi::String::New(env, "hello"),
                Napi::Function::New(env, threads));
    return exports;
}

NODE_API_MODULE(hello, Init)
