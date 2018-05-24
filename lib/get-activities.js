const _ = require('lodash');
const TaleoActivity = require('./taleo-activity');

module.exports = function (object, callback) {
  this.getObjectRelationship('packet', object.getId(), 'activity', (response) => {
    return _.map(_.get(response, 'activities'), (activity) => {
      return new TaleoActivity(activity);
    });
  }, callback);
};
