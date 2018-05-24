const _ = require('lodash');
const { objects, all } = require('./support');

module.exports = function (objectType, id, toObject, callback) {
  if (!_.get(all, 'get')) {
    return setImmediate(() => {
      callback(new Error('Unsupported operation: GET'));
    });
  }

  if (!_.get(objects, objectType)) {
    return setImmediate(() => {
      callback(new Error(`Unsupported object: ${objectType}`));
    });
  }

  this.enqueueRequest({
    method: 'GET',
    uri: `/object/${objectType}/${id}`,
    headers: {
      'Accept': 'application/json',
      'Cookie': `authToken=${this.authToken}`
    }
  }, 1, (err, data) => {
    if (err) {
      return callback(err);
    }

    callback(null, toObject(data));
  });
};
