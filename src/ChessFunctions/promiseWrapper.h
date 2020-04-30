
#ifndef PROMISEWRAPPER_H
#define PROMISEWRAPPER_H

#include <napi.h>

#include <functional>

#include "napi-thread-safe-callback.hpp"

typedef std::function<void(const std::string args)> resolveFunc;
typedef std::function<void(const std::string args)> rejectFunc;


typedef std::function<void(resolveFunc, rejectFunc)> PromiseFunc;

void promiseFuncWrapper(const Napi::Function& resolveInput, const PromiseFunc promFunc);

#endif
