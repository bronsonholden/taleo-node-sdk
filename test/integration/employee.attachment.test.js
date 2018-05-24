const { describe, it, before, after } = require('mocha');
const { expect } = require('chai');
const Taleo = require('../../');
const env = require('../env');

describe('employee - attachment', function () {
  var taleo;

  this.timeout(30000);

  before(function (done) {
    taleo = new Taleo(env);
    taleo.connect(done);
  });

  after(function (done) {
    taleo.close(done);
  });

  it('get employee attachments', function (done) {
    taleo.getEmployee(110, (err, employee) => {
      expect(err).to.not.exist;
      expect(employee).to.exist;
      expect(employee).to.be.an('object');

      taleo.getAttachments(employee, (err, attachments) => {
        expect(err).to.not.exist;
        expect(attachments).to.exist;
        expect(attachments).to.be.an('array');
        done();
      });
    });
  });
});
