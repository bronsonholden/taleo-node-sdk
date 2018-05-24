const _ = require('lodash');
const TaleoAttachment = require('./taleo-attachment');

module.exports = function (object, callback) {
  this.getObjectRelationship('employee', object.getId(), 'attachment', (response) => {
    return _.map(_.get(response, 'attachments'), (attachment) => {
      return new TaleoAttachment(attachment);
    });
  }, callback);
};
