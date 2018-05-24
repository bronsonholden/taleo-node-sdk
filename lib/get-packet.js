const TaleoPacket = require('./taleo-packet');

module.exports = function (id, callback) {
  return this.getObject('packet', id, (obj) => new TaleoPacket(obj), callback);
};
