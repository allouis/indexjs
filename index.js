module.exports = indexjs;

var fs = require('fs');

var createModuleCreationFunction = require('./lib/createModuleFunction');

var outputFunctions = {
  array: createModuleCreationFunction(function (output, module) {
    output.push(module);
  }),
  object: createModuleCreationFunction(function (output, module, parts) {
    output[parts[0]] = module;
  })
};

function id(x) { return x; }

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
