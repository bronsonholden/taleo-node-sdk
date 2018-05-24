const async = require('async');
const _ = require('lodash');
const TaleoEmployee = require('./taleo-employee');

module.exports = function (options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  if (options.start && options.limit) {
    this.enqueueRequest({
      method: 'GET',
      uri: '/object/employee/search',
      qs: {
        start: options.start,
        limit: options.limit
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
        start: options.start,
        limit: options.limit
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
          limit: limit
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
};
