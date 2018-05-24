const { describe, it, before, after } = require('mocha');
const { expect } = require('chai');
const Taleo = require('../../');
const env = require('../env');

describe('get-object', function () {
  var taleo;

  this.timeout(30000);

  before(function (done) {
    taleo = new Taleo(env);
    taleo.connect(done);
  });

  after(function (done) {
    taleo.close(done);
  });

  it('rejects invalid objects', function (done) {
    taleo.getObject('invalid', 1, function () {}, (err) => {
      expect(err).to.exist;
      expect(err).to.be.an('error');
      done();
    });
  });

  it('rejects invalid relationships', function (done) {
    taleo.getObjectRelationship('employee', 1, 'invalid', function () {}, (err) => {
      expect(err).to.exist;
      expect(err).to.be.an('error');
      done();
    });
  });
});
