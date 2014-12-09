module.exports = createModuleCreationFunction;

var path = require('path');

function createModuleCreationFunction (fn) {
  return function createModuleObject (dirname, transform) {
    return function moduleObjectReduce (modules, filename) {
      var parts = filename.split('.');
      if (parts[0] !== 'index' && filename[0] !== '.') {
        var module = transform(require(path.join(dirname, filename)));
        fn(modules, module, parts);
      }
      return modules;
    };
  };
}
