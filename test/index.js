var should = require('should');

var arrayTestModules = require('./arraytestmodules');
var objectTestModules = require('./objecttestmodules');

describe('exporting as an array', function () {

  it('should have a length of the number of files minus index.js', function () {
    arrayTestModules.length.should.be.exactly(2);
  });

});

describe('exporting as an object', function () {
  
  it('should have keys that match the filenames', function () {

    objectTestModules.one.should.exist;
    objectTestModules.two.should.exist;
//    objectTestModules.three.should.not.exist;

  });

});
