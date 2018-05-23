const TaleoEmployee = require('./taleo-employee');

module.exports = function (id, callback) {
  return this.getObject('employee', id, (obj) => new TaleoEmployee(obj), callback);
};
