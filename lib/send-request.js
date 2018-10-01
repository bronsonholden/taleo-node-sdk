const _ = require('lodash');
const async = require('async');
const request = require('request');

module.exports = function (req, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  async.waterfall([
    (callback) => {
      request({
        method: 'GET',
        baseUrl: `${this.serviceUrl}/${this.orgCode}`,
        uri: '/'
      }, (err, res, body) => {
        if (err) {
          return callback(err);
        }

        if (typeof body !== 'object') {
          body = JSON.parse(body);
        }

        if (!_.get(body, 'status.success')) {
          return callback(new Error(_.get(body, 'status.detail.errormessage') || JSON.stringify(body)));
        }

        callback(null, _.get(body, 'response'));
      });
    },
    (instance, callback) => {
      var resourceUrl = _.get(instance, 'URL');
      var writeStream = _.get(options, 'writeStream');
      var readStream = _.get(options, 'readStream');
      var requestHandler = _.get(options, 'requestHandler');

      var r = request(_.merge(req, {
        baseUrl: resourceUrl
      }), (err, res, body) => {
        if (err) {
          return callback(err);
        }

        var contentType = _.get(res, [ 'headers', 'content-type' ]);

        if (typeof contentType === 'string' && contentType.indexOf('application/json') > -1) {
          if (typeof body !== 'object') {
            body = JSON.parse(body);
          }

          if (!_.get(body, 'status.success')) {
            return callback(new Error(_.get(body, 'status.detail.errormessage') || 'Unknown error occurred'));
          }

          callback(null, res, _.get(body, 'response'));
        } else {
          callback();
        }
      });

      if (writeStream) {
        r.pipe(writeStream);
      }

      if (readStream) {
        readStream.pipe(r);
      }

      if (requestHandler) {
        requestHandler(r);
      }
    }
  ], (err, res, data) => {
    if (err) {
      return callback(err);
    }

    callback(null, res, data);
  });
};
