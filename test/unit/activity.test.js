const { describe, it, before, after } = require('mocha');
const { expect } = require('chai');
const Taleo = require('../../');
const env = require('../env');
const fs = require('fs');
const md5 = require('md5');

describe('activity', function () {
  var taleo;

  this.timeout(30000);

  before(function (done) {
    taleo = new Taleo(env);
    taleo.connect(done);
  });

  after(function (done) {
    taleo.close(done);
  });

  it('get activity by ID', function (done) {
    taleo.getActivity(11923, (err, activity) => {
      expect(err).to.not.exist;
      expect(activity).to.exist;
      expect(activity).to.be.an('object');
      done();
    });
  });

  it('download to file', function (done) {
    taleo.getActivity(11923, (err, activity) => {
      expect(err).to.not.exist;
      expect(activity).to.exist;
      expect(activity).to.be.an('object');
      taleo.downloadActivity(activity, fs.createWriteStream('./test1.pdf'), (err) => {
        expect(err).to.not.exist;
        fs.readFile('./test1.pdf', (err, data) => {
          expect(err).to.not.exist;
          expect(data).to.exist;
          expect(md5(data)).to.equal('9d649fb038089f6eda6f481ee4355aeb');
          fs.unlink('./test1.pdf', done);
        });
      });
    });
  });

  it('download to file via request handler', function (done) {
    taleo.getActivity(11923, (err, activity) => {
      expect(err).to.not.exist;
      expect(activity).to.exist;
      expect(activity).to.be.an('object');
      taleo.downloadActivity(activity, (readStream) => {
        readStream.pipe(fs.createWriteStream('./test2.pdf'));
      }, (err) => {
        expect(err).to.not.exist;
        fs.readFile('./test2.pdf', (err, data) => {
          expect(err).to.not.exist;
          expect(data).to.exist;
          expect(md5(data)).to.equal('9d649fb038089f6eda6f481ee4355aeb');
          fs.unlink('./test2.pdf', done);
        });
      });
    });
  });
});
