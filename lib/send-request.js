const _ = require('lodash');
const async = require('async');
const request = require('request');

module.exports = function (req, callback) {
  async.waterfall([
    (callback) => {
      request({
        method: 'GET',
        baseUrl: `https://tbe.taleo.net/MANAGER/dispatcher/api/v1/serviceUrl/${this.orgCode}`,
        uri: '/'
      }, (err, res, body) => {
        if (err) {
          return callback(err);
        }

        if (typeof body !== 'object') {
          body = JSON.parse(body);
        }

        if (!_.get(body, 'status.success')) {
          return callback(new Error(_.get(body, 'status.detail.errormessage') || 'Unknown error occurred'));
        }

        callback(null, _.get(body, 'response'));
      });
    },
    (instance, callback) => {
      var resourceUrl = _.get(instance, 'URL');

      request(_.merge(req, {
        baseUrl: resourceUrl
      }), (err, res, body) => {
        if (err) {
          return callback(err);
        }

        if (typeof body !== 'object') {
          body = JSON.parse(body);
        }

        if (!_.get(body, 'status.success')) {
          return callback(new Error(_.get(body, 'status.detail.errormessage') || 'Unknown error occurred'));
        }

        callback(null, res, _.get(body, 'response'));
      });
    }
  ], (err, res, data) => {
    if (err) {
      return callback(err);
    }

    callback(null, res, data);
  });
};
