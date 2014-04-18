module.exports = indexjs;

var fs = require('fs');
var path = require('path');

function createModuleCreationFunction (fn) {
  return function createModuleObject (dirname) {
    return function moduleObjectReduce (modules, filename) {
      var parts = filename.split('.');
      if (parts[0] !== 'index' && parts.pop() === 'js') {
        fn(modules, require(path.join(dirname, filename)), parts);
      }
      return modules;
    };
  };
}

var createModuleArray = createModuleCreationFunction(function (modules, module) {
  modules.push(module);
});
var createModuleObject = createModuleCreationFunction(function (modules, module, parts) {
  modules[parts[0]] = module;
});

var outputFunctions = {
  array: createModuleArray,
  object: createModuleObject
};

function indexjs (dirname, output) {
  var type = typeof output;
  if (type !== 'object') {
    throw new TypeError('Invalid output type, requires Object or Array');
  }
  if (Array.isArray(output)) {
    type = 'array';
  }
  var createModuleOutput = outputFunctions[type];
  return fs.readdirSync(dirname).reduce(createModuleOutput(dirname), output);
}
