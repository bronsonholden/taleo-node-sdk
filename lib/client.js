const async = require('async');

function Taleo(config) {
  this.orgCode = config.orgCode;
  this.username = config.username;
  this.password = config.password;
  this.serviceUrl = config.serviceUrl;
  this.closing = false;
  this.authToken = null;
  this.expired = true;
  this.expireTimer = null;

  this.queue = async.priorityQueue((task, callback) => {
    if (task.request) {
      this.sendRequest(task.request, task.options, (err, res, data) => {
        if (err) {
          return callback(err);
        }

        callback(null, data);
      });
    } else if (task.idle) {
      setTimeout(callback, task.idle);
    }
  });
}

Taleo.prototype.connect = require('./connect');
Taleo.prototype.close = require('./close');
Taleo.prototype.enqueueRequest = require('./enqueue-request');
Taleo.prototype.sendRequest = require('./send-request');
Taleo.prototype.getObject = require('./get-object');
Taleo.prototype.getObjectRelationship = require('./get-object-relationship');
Taleo.prototype.getEmployee = require('./get-employee');
Taleo.prototype.getEmployees = require('./get-employees');
Taleo.prototype.getAttachments = require('./get-attachments');
Taleo.prototype.downloadAttachment = require('./download-attachment');
Taleo.prototype.getPacket = require('./get-packet');
Taleo.prototype.getPackets = require('./get-packets');
Taleo.prototype.getActivity = require('./get-activity');
Taleo.prototype.getActivities = require('./get-activities');
Taleo.prototype.downloadActivity = require('./download-activity');

module.exports = Taleo;
