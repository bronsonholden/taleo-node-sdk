const _ = require('lodash');

function TaleoActivity(obj) {
  this.obj = obj;
}

TaleoActivity.prototype.getId = function () {
  return _.get(this.obj, 'activity.id');
};

TaleoActivity.prototype.getTitle = function () {
  return _.get(this.obj, 'activity.title');
};

TaleoActivity.prototype.getCompleted = function () {
  return _.get(this.obj, 'activity.status') === 3;
};

TaleoActivity.prototype.getEmployeeId = function () {
  return _.get(this.obj, 'activity.employeeId');
};

TaleoActivity.prototype.getEntityType = function () {
  return 'activity';
};

module.exports = TaleoActivity;
