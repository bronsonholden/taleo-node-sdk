const _ = require('lodash');

module.exports = function (callback) {
  // Don't allow multiple connections so we don't consume all of the 20
  // max allowed tokens
  if (!this.expired) {
    return setImmediate(callback);
  }

  this.sendRequest({
    method: 'POST',
    uri: '/login',
    headers: {
      'Accept': 'application/json'
    },
    qs: {
      'orgCode': this.orgCode,
      'userName': this.username,
      'password': this.password
    }
  }, (err, res, data) => {
    if (err) {
      return callback(err);
    }

    var authToken = _.get(data, 'authToken');

    if (!authToken) {
      return callback(new Error('Invalid authToken received'));
    }

    this.authToken = authToken;
    this.expired = false;

    // Expire just before the 4 hour mark
    const expiry = (1000 * 60 * 4) - 30000;

    this.expireTimer = setTimeout(() => {
      this.expired = true;
    }, expiry);

    callback();
  });
};
