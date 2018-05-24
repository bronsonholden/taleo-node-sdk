const TaleoActivity = require('./taleo-activity');

module.exports = function (id, callback) {
  return this.getObject('activity', id, (obj) => new TaleoActivity(obj), callback);
};
