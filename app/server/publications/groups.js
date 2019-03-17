Meteor.publish("allGroups", function() {
  // Publish all groups
  return Groups.find();
});

Meteor.publish("currentUserGroups", function() {
  if (Meteor.user()) {
    const userId = Meteor.user()._id;

    // Check for existing permissions
    const existingUserPermissions = Permissions.find({ userId }).fetch();

    const existingUserPermissionGroupIds = existingUserPermissions.map(
      permission => permission.groupId
    );

    return Groups.find({ _id: { $in: existingUserPermissionGroupIds } });
  }
});

Meteor.publish("singleGroup", function(groupId) {
  // Publish only one group, specified as groupId
  return Groups.find(groupId);
});
