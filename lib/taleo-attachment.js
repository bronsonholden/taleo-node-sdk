const _ = require('lodash');

function TaleoAttachment(obj) {
  this.obj = obj;
}

TaleoAttachment.prototype.getId = function () {
  return _.get(this.obj, 'attachment.id');
};

TaleoAttachment.prototype.getAttachmentType = function () {
  return _.get(this.obj, 'attachment.attachmentType');
};

TaleoAttachment.prototype.getDescription = function () {
  return _.get(this.obj, 'attachment.description');
};

TaleoAttachment.prototype.getContentType = function () {
  return _.get(this.obj, 'attachment.contentType');
};

TaleoAttachment.prototype.getDownloadUrl = function () {
  return _.get(this.obj, 'attachment.downloadUrl');
};

TaleoAttachment.prototype.getAttachedId = function () {
  return _.get(this.obj, 'attachment.entityId');
};

TaleoAttachment.prototype.getAttachedEntityType = function () {
  switch (_.get(this.obj, 'attachment.entityType')) {
  case 'EMPL':
    return 'employee';
  default:
    return undefined;
  }
};

TaleoAttachment.prototype.getEntityType = function () {
  return 'attachment';
};

module.exports = TaleoAttachment;
