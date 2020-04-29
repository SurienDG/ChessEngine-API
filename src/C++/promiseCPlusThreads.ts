import bindings from 'bindings';


 const addon = bindings('../src/C++/build/Release/hello');

 console.log(addon.hello()); // 'world'
