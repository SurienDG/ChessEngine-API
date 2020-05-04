#include <thread>
#include "json.hpp"
#include "promiseWrapper.h"
#include <napi.h>

using namespace nlohmann;

Napi::Boolean validateAndMakeMoveJS(const Napi::CallbackInfo &info)
{
    PROMISE(info,
            {
                std::string FEN = info[0].As<Napi::String>();
                // resolve(FEN);
            });
    return Napi::Boolean::New(info.Env(), true);
}

Napi::Boolean validationJS(const Napi::CallbackInfo &info)
{
    PROMISE(info,
            {
                std::string FEN = info[0].As<Napi::String>();
                // Add main code here
                resolve(FEN);
            });
    return Napi::Boolean::New(info.Env(), true);
}

Napi::Object Init(Napi::Env env, Napi::Object exports)
{
    exports.Set(Napi::String::New(env, "validateAndMakeMove_cPlus"),
                Napi::Function::New(env, validateAndMakeMoveJS));
    exports.Set(Napi::String::New(env, "validate_cPlus"),
                Napi::Function::New(env, validationJS));
    return exports;
}

NODE_API_MODULE(chessFunctions, Init)
