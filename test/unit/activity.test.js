const { describe, it, before, after } = require('mocha');
const { expect } = require('chai');
const async = require('async');
const Taleo = require('../../');
const env = require('../env');
const fs = require('fs');

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
    taleo.getActivity(17806, (err, activity) => {
      expect(err).to.not.exist;
      expect(activity).to.exist;
      expect(activity).to.be.an('object');
      done();
    });
  });

  it('download to file', function (done) {
    taleo.getActivity(17806, (err, activity) => {
      expect(err).to.not.exist;
      expect(activity).to.exist;
      expect(activity).to.be.an('object');
      taleo.downloadActivity(activity, fs.createWriteStream('./test1.pdf'), (err) => {
        expect(err).to.not.exist;
        fs.unlink('./test1.pdf', done);
      });
    });
  });

  it('download to file via request handler', function (done) {
    taleo.getActivity(17806, (err, activity) => {
      expect(err).to.not.exist;
      expect(activity).to.exist;
      expect(activity).to.be.an('object');
      taleo.downloadActivity(activity, (readStream) => {
        readStream.pipe(fs.createWriteStream('./test2.pdf'));
      }, (err) => {
        expect(err).to.not.exist;
        fs.unlink('./test2.pdf', done);
      });
    });
  });
});
