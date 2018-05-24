const { describe, it, before, after } = require('mocha');
const { expect } = require('chai');
const async = require('async');
const Taleo = require('../../');
const env = require('../env');

describe('packet', function () {
  var taleo;

  this.timeout(30000);

  before(function (done) {
    taleo = new Taleo(env);
    taleo.connect(done);
  });

  after(function (done) {
    taleo.close(done);
  });

  it('get packet by ID', function (done) {
    taleo.getPacket(1037, (err, packet) => {
      expect(err).to.not.exist;
      expect(packet).to.exist;
      expect(packet).to.be.an('object');
      done();
    });
  });

  describe('packet properties', function () {
    var packet;

    before(function (done) {
      taleo.getPacket(1037, (err, pkt) => {
        packet = pkt;
        expect(err).to.not.exist;
        done();
      });
    });

    it('packet ID', function (done) {
      expect(packet.getId()).to.exist;
      expect(packet.getId()).to.be.a('number');
      done();
    });
  });
});
