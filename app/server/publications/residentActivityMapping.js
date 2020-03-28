Meteor.publish('residentById', function(activityId) {
  const activityResidents = ResidentActivityMapping.find({
    activityId,
  }).fetch();

  return Residents.find({
    _id: { $in: activityResidents.map(map => map.residentId) },
  });
});
