const { describe, it } = require('mocha');
const { expect } = require('chai');
const Taleo = require('../../');
const env = require('../env');

describe('connect', function () {
  this.timeout(30000);

  it('connect to and disconnect from Taleo', function (done) {
    var taleo = new Taleo(env);

    taleo.connect((err) => {
      expect(err).to.not.exist;
      taleo.close(done);
    });
  });
});
