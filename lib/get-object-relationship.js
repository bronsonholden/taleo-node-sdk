const _ = require('lodash');
const { relationships } = require('./support');

module.exports = function (objectType, id, relationship, toObject, callback) {
  if (!_.get(relationships, `${objectType}.${relationship}.get`)) {
    return setImmediate(() => {
      callback(new Error(`Unsupported operation: GET ${objectType}/${relationship}`));
    });
  }

  this.enqueueRequest({
    method: 'GET',
    uri: `/object/${objectType}/${id}/${relationship}`,
    headers: {
      'Accept': 'application/json',
      'Cookie': `authToken=${this.authToken}`
    }
  }, 1, (err, data) => {
    if (err) {
      return callback(err);
    }
    var o = toObject(data);
    callback(null, toObject(data));
  });
};
