const { describe, it } = require('mocha');
const { expect } = require('chai');
const async = require('async');
const Taleo = require('../');
const env = require('./env');

describe('connect', function () {
  this.timeout(30000);

  it('connect to and disconnect from Taleo', function (done) {
    async.timesSeries(5, (n, callback) => {
      var taleo = new Taleo(env);

      taleo.connect((err) => {
        expect(err).to.not.exist;
        taleo.close(callback);
      });
    }, done);
  });
});
