module.exports = function (activity, writeStream, callback) {
  var downloadUrl = activity.getDownloadUrl();

  if (!downloadUrl) {
    return setImmediate(() => {
      callback(new Error(`Activity ${activity.getId()} - ${activity.getTitle()} is not available for download`));
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
    uri: `/object/activity/${activity.getId()}/form/download`,
    headers: {
      'Accept': 'application/pdf',
      'Cookie': `authToken=${this.authToken}`
    }
  }, 1, options, callback);
};
