const _ = require('lodash');

function TaleoEmployee(obj) {
  this.obj = obj;
}

TaleoEmployee.prototype.getId = function () {
  return _.get(this.obj, 'employee.employeeId');
};

TaleoEmployee.prototype.getFirstName = function () {
  return _.get(this.obj, 'employee.firstName');
};

TaleoEmployee.prototype.getLastName = function () {
  return _.get(this.obj, 'employee.lastName');
};

TaleoEmployee.prototype.getEntityType = function () {
  return 'employee';
};

module.exports = TaleoEmployee;
