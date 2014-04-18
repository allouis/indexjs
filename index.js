module.exports = indexjs;

var fs = require('fs');
var path = require('path');

var createModuleCreationFunction = require('./lib/createModuleFunction');

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
