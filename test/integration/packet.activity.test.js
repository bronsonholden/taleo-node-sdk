const { describe, it, before, after } = require('mocha');
const { expect } = require('chai');
const Taleo = require('../../');
const env = require('../env');

describe('packet - activity', function () {
  var taleo;

  this.timeout(30000);

  before(function (done) {
    taleo = new Taleo(env);
    taleo.connect(done);
  });

  after(function (done) {
    taleo.close(done);
  });

  it('get packet activities', function (done) {
    taleo.getPacket(746, (err, packet) => {
      expect(err).to.not.exist;
      expect(packet).to.exist;
      expect(packet).to.be.an('object');

      taleo.getActivities(packet, (err, activities) => {
        expect(err).to.not.exist;
        expect(activities).to.exist;
        expect(activities).to.be.an('array');
        done();
      });
    });
  });
});
