module.exports = createModuleCreationFunction;

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
