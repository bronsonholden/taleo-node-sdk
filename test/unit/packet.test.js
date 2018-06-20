const { describe, it, before, after } = require('mocha');
const { expect } = require('chai');
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
    taleo.getPacket(746, (err, packet) => {
      expect(err).to.not.exist;
      expect(packet).to.exist;
      expect(packet).to.be.an('object');
      done();
    });
  });

  describe('packet properties', function () {
    var packet;

    before(function (done) {
      taleo.getPacket(746, (err, pkt) => {
        packet = pkt;
        expect(err).to.not.exist;
        done();
      });
    });

    it('packet ID', function (done) {
      expect(packet.getId()).to.exist;
      expect(packet.getId()).to.be.a('number');
      expect(packet.getId()).to.equal(746);
      done();
    });

    it('packet title', function (done) {
      expect(packet.getPacketTitle()).to.be.a('string');
      done();
    });

    it('packet employee', function (done) {
      expect(packet.getEmployeeId()).to.be.a('number');
      done();
    });

    it('packet owner', function (done) {
      expect(packet.getOwnerId()).to.be.a('number');
      done();
    });

    it('packet creator', function (done) {
      expect(packet.getCreatorId()).to.be.a('number');
      done();
    });

    it('packet creator', function (done) {
      expect(packet.getCreatorId()).to.be.a('number');
      done();
    });

    it('packet entity type', function (done) {
      expect(packet.getEntityType()).to.be.a('string');
      expect(packet.getEntityType()).to.equal('packet');
      done();
    });

    it('packet activity count', function (done) {
      expect(packet.getActivityCount()).to.be.a('number');
      expect(packet.getActivityCount()).to.be.above(0);
      done();
    });

    it('packet activity count', function (done) {
      expect(packet.getCompletedActivityCount()).to.be.a('number');
      expect(packet.getCompletedActivityCount()).to.be.above(-1);
      done();
    });

    it('packet completed', function (done) {
      expect(packet.getCompleted()).to.be.a('boolean');
      done();
    });
  });
});
