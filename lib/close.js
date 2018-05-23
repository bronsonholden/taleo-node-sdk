module.exports = function (callback) {
  if (this.authToken) {
    this.enqueueRequest({
      method: 'POST',
      uri: '/logout',
      headers: {
        'Cookie': `authToken=${this.authToken}`
      }
    }, 1, (err) => {
      if (err) {
        return callback(err);
      }

      if (this.queue.length() === 0 && this.queue.running() === 0) {
        setImmediate(callback);
      } else {
        this.queue.drain = callback;
      }
    });

    clearTimeout(this.expireTimer);
    this.closing = true;
  } else {
    setImmediate(callback);
  }
};
