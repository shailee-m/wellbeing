Template.deleteActivityConfirmation.events({
  "click #confirm-delete" () {
    // Get Activity ID
    const activityId = this.activity._id;

    // Delete Activity
    Meteor.call('deleteActivity', activityId, function() {
      // Dismiss the modal dialogue
      Modal.hide('deleteActivityConfirmation');
      Session.set('activity-deleted', true);
    });
  }
});
