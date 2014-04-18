module.exports = indexjs;

var fs = require('fs');
var path = require('path');

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

function createModuleArray (dirname) {
  return function moduleArrayReduce (modules, filename) {
    var parts = filename.split('.');
    if (parts[0] === 'index' || parts.pop() !== 'js') {
      return modules;
    }
    var fullpath = path.join(dirname, filename);
    modules.push(require(fullpath));
    return modules;
  };
}

function createModuleObject (dirname) {
  return function moduleObjectReduce (modules, filename) {
    var parts = filename.split('.');
    if (parts[0] === 'index' || parts.pop() !== 'js') {
      return modules;
    }
    var fullpath = path.join(dirname, filename);
    modules[parts[0]] = require(fullpath);
    return modules;
  };
}
