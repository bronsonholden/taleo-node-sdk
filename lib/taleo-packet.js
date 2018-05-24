const _ = require('lodash');

function TaleoPacket(obj) {
  this.obj = obj;
}

TaleoPacket.prototype.getId = function () {
  return _.get(this.obj, 'packet.activityPacketId');
};

TaleoPacket.prototype.getPacketTitle = function () {
  return _.get(this.obj, 'title');
};

TaleoPacket.prototype.getEmployeeId = function () {
  return _.get(this.obj, 'packet.employeeId');
};

TaleoPacket.prototype.getOwnerId = function () {
  return _.get(this.obj, 'packet.ownerId');
};

TaleoPacket.prototype.getCreatorId = function () {
  return _.get(this.obj, 'packet.createdById');
};

TaleoPacket.prototype.getEntityType = function () {
  return 'packet';
};

TaleoPacket.prototype.getCompleted = function () {
  return _.get(this.obj, 'packet.status') === 3;
};

TaleoPacket.prototype.getActivityCount = function () {
  return _.get(this.obj, 'packet.activitiesCount');
};

TaleoPacket.prototype.getCompletedActivityCount = function () {
  return _.get(this.obj, 'packet.activitiesCompleted');
};

module.exports = TaleoPacket;
