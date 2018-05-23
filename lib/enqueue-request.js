module.exports = function (req, priority, callback) {
  if (this.closing) {
    return process.nextTick(() => {
      callback(new Error('Client is currently shutting down'));
    });
  }

  if (this.expired) {
    this.connect((err) => {
      if (err) {
        return callback();
      }

      this.queue.push({
        request: req
      }, priority, callback);
    });
  } else {
    this.queue.push({
      request: req
    }, priority, callback);
  }
};
