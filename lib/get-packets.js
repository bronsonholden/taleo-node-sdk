const _ = require('lodash');
const TaleoPacket = require('./taleo-packet');

module.exports = function (object, callback) {
  this.getObjectRelationship('employee', object.getId(), 'packet', (response) => {
    return _.map(_.get(response, 'activityPackets'), (packet) => {
      return new TaleoPacket(packet);
    });
  }, callback);
};
