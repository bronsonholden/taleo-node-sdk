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

TaleoEmployee.prototype.getGender = function () {
  return _.get(this.obj, 'employee.gender');
};

TaleoEmployee.prototype.getLocation = function () {
  return _.get(this.obj, 'employee.location');
};

TaleoEmployee.prototype.getJobTitle = function () {
  return _.get(this.obj, 'employee.jobTitle');
};

TaleoEmployee.prototype.getPhoneNumber = function () {
  return _.get(this.obj, 'employee.phone');
};

TaleoEmployee.prototype.getSsn = function () {
  return _.get(this.obj, 'employee.ssn');
};

TaleoEmployee.prototype.getEmail = function () {
  return _.get(this.obj, 'employee.email');
};

TaleoEmployee.prototype.getDepartment = function () {
  return _.get(this.obj, 'employee.department');
};

TaleoEmployee.prototype.getAddress = function () {
  return _.get(this.obj, 'employee.address');
};

TaleoEmployee.prototype.getAddress2 = function () {
  return _.get(this.obj, 'employee.address2');
};

TaleoEmployee.prototype.getCity = function () {
  return _.get(this.obj, 'employee.city');
};

TaleoEmployee.prototype.getCounty = function () {
  return _.get(this.obj, 'employee.county');
};

TaleoEmployee.prototype.getZipCode = function () {
  return _.get(this.obj, 'employee.zipCode');
};

TaleoEmployee.prototype.getCountry = function () {
  return _.get(this.obj, 'employee.country');
};

TaleoEmployee.prototype.getEntityType = function () {
  return 'employee';
};

module.exports = TaleoEmployee;
