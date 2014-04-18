var should = require('should');

var testmodules = require('./testmodules');

describe('exporting as an array', function () {

  it('should have a length of the number of files minus index.js', function () {
    testmodules.length.should.be.exactly(2);
  });

});
