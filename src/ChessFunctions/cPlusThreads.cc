
#include <napi.h>
#include <thread>
#include "napi-thread-safe-callback.hpp"

Napi::Boolean threads(const Napi::CallbackInfo& info) {
    auto resolve =
        std::make_unique<ThreadSafeCallback>(info[0].As<Napi::Function>());
    std::thread([resolve = std::move(resolve)]() {
        resolve->callError("error");
        resolve->call([](Napi::Env env, std::vector<napi_value>& args) {
            // This will run in main thread and needs to construct the
            // arguments for the call
            args = {Napi::String::New(env, "test")};
        });
    }).detach();
    return Napi::Boolean::New(info.Env(), true);
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
    exports.Set(Napi::String::New(env, "hello"),
                Napi::Function::New(env, threads));
    return exports;
}

NODE_API_MODULE(hello, Init)
