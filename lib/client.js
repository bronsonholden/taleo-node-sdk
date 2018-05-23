const async = require('async');

function Taleo(config) {
  this.orgCode = config.orgCode;
  this.username = config.username;
  this.password = config.password;
  this.closing = false;
  this.authToken = null;
  this.expired = true;
  this.expireTimer = null;

  this.queue = async.priorityQueue((task, callback) => {
    if (task.request) {
      this.sendRequest(task.request, (err, res, data) => {
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

module.exports = Taleo;
