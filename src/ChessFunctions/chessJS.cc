#include <napi.h>
#include <thread>
#include "json.hpp"
#include "promiseWrapper.h"

using namespace nlohmann;

Napi::Boolean validateAndMakeMoveJS(const Napi::CallbackInfo &info)
{
    std::string FEN = info[0].As<Napi::String>();
    promiseFuncWrapper(info[1].As<Napi::Function>(), info[2].As<Napi::Function>(),
                       [&FEN](resolveFunc resolve, rejectFunc reject) {
                           // Add main code here
                           //resolve(FEN);
                       });
    return Napi::Boolean::New(info.Env(), true);
}

Napi::Boolean validationJS(const Napi::CallbackInfo &info)
{
    std::string FEN = info[0].As<Napi::String>();
    promiseFuncWrapper(info[1].As<Napi::Function>(), info[2].As<Napi::Function>(),
                       [&FEN](resolveFunc resolve, rejectFunc reject) {
                           // Add main code here
                           // resolve(FEN); 
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
