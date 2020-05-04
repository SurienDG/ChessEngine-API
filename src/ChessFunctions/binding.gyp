{
  "targets": [
    {
      "target_name": "chessFunctions",
      "cflags!": [ "-fno-exceptions" ],
      "cflags_cc!": [ "-fno-exceptions" ],
      "sources": [ "chessJS.cc" ],
      "include_dirs": [
        "<!@(node -p \"require('node-addon-api').include\")",
        "<!@(node -p \"require('napi_thread_safe_promise').include\")"

      ],
      "libraries": ["<!@(node -p \"require('napi_thread_safe_promise').libraries\")" ],
     "defines": [ "NAPI_CPP_EXCEPTIONS" ],
     "msvs_settings": {
      "VCCLCompilerTool": { "ExceptionHandling": 1 }
    },
    "xcode_settings": {
      "GCC_ENABLE_CPP_EXCEPTIONS": "YES",
      "CLANG_CXX_LIBRARY": "libc++",
      "MACOSX_DEPLOYMENT_TARGET": "10.7",
    },
    "conditions": [
      ["OS==\"win\"", { "defines": [ "_HAS_EXCEPTIONS=1" ] }]
    ]
    }
  ]
}
