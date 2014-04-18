module.exports = indexjs;

var fs = require('fs');
var path = require('path');

function indexjs (dirname, type) {
  return fs.readdirSync(dirname).reduce(createModuleArray(dirname), []);
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
