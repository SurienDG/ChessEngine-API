
#include "promiseWrapper.h"

#include <functional>
#include <memory>
#include <thread>

#include "json.hpp"
#include "napi-thread-safe-callback.hpp"

void promiseFuncWrapper(const Napi::Function& resolveInput, const PromiseFunc promFunc) {
    std::shared_ptr<ThreadSafeCallback> resolveInputPtr =
        std::make_shared<ThreadSafeCallback>(resolveInput);

    resolveFunc resolve = [resolveInputPtr](const std::string argsInput) {
        resolveInputPtr->call(
            [argsInput](Napi::Env env, std::vector<napi_value>& args) {
                // This will run in main thread and needs to construct the
                // arguments for the call
                args = {Napi::String::New(env, argsInput)};
            });
    };
    // std::unique_ptr<ThreadSafeCallback> test = std::move(resolveInputPtr);
    rejectFunc reject = [resolveInputPtr](const std::string& msg) {
        resolveInputPtr->callError(msg);
    };

    promFunc(resolve, reject);
}