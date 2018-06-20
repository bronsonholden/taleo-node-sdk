const { describe, it, before, after } = require('mocha');
const { expect } = require('chai');
const Taleo = require('../../');
const env = require('../env');

describe('employee - packet', function () {
  var taleo;

  this.timeout(30000);

  before(function (done) {
    taleo = new Taleo(env);
    taleo.connect(done);
  });

  after(function (done) {
    taleo.close(done);
  });

  it('get employee packets', function (done) {
    taleo.getEmployee(614, (err, employee) => {
      expect(err).to.not.exist;
      expect(employee).to.exist;
      expect(employee).to.be.an('object');

      taleo.getPackets(employee, (err, packets) => {
        expect(err).to.not.exist;
        expect(packets).to.exist;
        expect(packets).to.be.an('array');
        done();
      });
    });
  });
});
