module.exports = function (attachment, writeStream, callback) {
  var downloadUrl = attachment.getDownloadUrl();

  if (!downloadUrl) {
    return setImmediate(() => {
      callback(new Error(`Attachment ${attachment.getId()} - ${attachment.getDescription()} is not available for download`));
    });
  }

  var options = {};

  if (typeof writeStream === 'function') {
    options.requestHandler = writeStream;
  } else {
    options.writeStream = writeStream;
  }

  this.enqueueRequest({
    method: 'GET',
    uri: `/object/employee/${attachment.getAttachedId()}/attachment/${attachment.getId()}/download`,
    headers: {
      'Accept': 'application/pdf',
      'Cookie': `authToken=${this.authToken}`
    }
  }, 1, options, callback);
};
