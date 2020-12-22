#include <thread>

#include "json.hpp"
#include "napi.h"
#include "promiseWrapper.h"

using namespace nlohmann;

Napi::Promise validateAndMakeMoveJS(const Napi::CallbackInfo &info) {
  return PROMISE(info, {
    std::string FEN = info[0].As<Napi::String>();
    resolve(FEN);
  });
}

Napi::Promise validationJS(const Napi::CallbackInfo &info) {
  return PROMISE(info, {
    std::string FEN = info[0].As<Napi::String>();
    // Add main code here
    resolve(FEN);
  });
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports.Set(Napi::String::New(env, "validateAndMakeMove_cPlus"),
              Napi::Function::New(env, validateAndMakeMoveJS));
  exports.Set(Napi::String::New(env, "validate_cPlus"),
              Napi::Function::New(env, validationJS));
  return exports;
}

NODE_API_MODULE(chessFunctions, Init)
