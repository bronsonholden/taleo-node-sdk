const url = require('url');
const async = require('async');
const _ = require('lodash');
const TaleoEmployee = require('./taleo-employee');

module.exports = function (options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  async.waterfall([
    (callback) => {
      if (options.digicode && options.searchId) {
        return callback();
      }

      this.enqueueRequest({
        method: 'GET',
        uri: '/object/employee/search',
        qs: {
          limit: 0
        },
        headers: {
          'Cookie': `authToken=${this.authToken}`
        }
      }, 1, (err, data) => {
        if (err) {
          return callback(err);
        }

        var pagination = _.get(data, 'pagination');
        var selfUrl = url.parse(_.get(pagination, 'self'), true);
        var searchId = selfUrl.query.searchId;
        var digicode = selfUrl.query.digicode;

        if (!searchId || !digicode) {
          return callback(new Error('Unable to perform employee search, invalid search token returned'));
        }

        options.digicode = digicode;
        options.searchId = searchId;

        callback();
      });
    },
    (callback) => {
      if (options.start && options.limit) {
        this.enqueueRequest({
          method: 'GET',
          uri: '/object/employee/search',
          qs: {
            start: options.start,
            limit: options.limit,
            searchId: options.searchId,
            digicode: options.digicode
          },
          headers: {
            'Cookie': `authToken=${this.authToken}`
          }
        }, 1, (err, data) => {
          if (err) {
            return callback(err);
          }

          var results = _.get(data, 'searchResults');

          callback(null, _.map(results, (emp) => new TaleoEmployee(emp)));
        });
      } else {
        const limit = options.limit || 100;

        this.enqueueRequest({
          method: 'GET',
          uri: '/object/employee/search',
          qs: {
            start: 1,
            limit: limit,
            searchId: options.searchId,
            digicode: options.digicode
          },
          headers: {
            'Cookie': `authToken=${this.authToken}`
          }
        }, 1, (err, data) => {
          if (err) {
            return callback(err);
          }

          var results = _.get(data, 'searchResults');
          var pagination = _.get(data, 'pagination');
          var first = _.map(results, (emp) => new TaleoEmployee(emp));
          var ranges = [];

          for (var start = first.length + 1; start < pagination.total; start += limit) {
            ranges.push({
              start: start,
              limit: Math.min(limit, (pagination.total - start) + 1),
              searchId: options.searchId,
              digicode: options.digicode
            });
          }

          async.mapSeries(ranges, (range, callback) => {
            this.getEmployees(range, callback);
          }, (err, results) => {
            if (err) {
              return callback(err);
            }

            callback(null, first.concat(_.flatten(results)));
          });
        });
      }
    }
  ], (err, employees) => {
    if (err) {
      return callback(err);
    }

    callback(null, employees);
  });
};
