Template.activitiesTableResidentsCell.onCreated(function() {
  this.subscribe('residentById', this.data._id);
  this.subscribe('activityById', this.data._id);
});

Template.activitiesTableResidentsCell.helpers({
  residentNames() {
    // Get reference to current activity
    const activity = this;
    if (Template.instance().subscriptionsReady()) {
      return Activities.findOne({
        _id: activity._id,
      }).residentNames();
    }
    return '';
  },
});
