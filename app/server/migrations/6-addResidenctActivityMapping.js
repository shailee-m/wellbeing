import { ResidentActivityMappingCollection } from '../../both/collections/residentActivityMapping';

Migrations.add({
  version: 6,
  name:
    'Extract resident activity mapping from activities and it to new mapping collection',
  up: function() {
    // Get all users
    ResidentActivityMappingCollection.remove({});

    const activities = Activities.find().fetch();
    activities
      .reduce(
        (array, current) => [
          ...array,
          ...current.residentIds.map(resident => ({
            activityId: current._id,
            residentId: resident,
            // engagementLevel: null,
          })),
        ],
        []
      )
      .forEach(mapping => {
        ResidentActivityMappingCollection.insert(mapping);
      });

    Activities.update({}, { $set: { residentIds: [] } });
  },
  down: function() {
    const mappings = ResidentActivityMappingCollection.find().fetch();
    const residentActivityMap = mappings.reduce(
      (mapObject, current) => {
        if (!mapObject[current.activityId]) {
          mapObject[current.activityId] = [];
        }
        mapObject[current.activityId].push(current.residentId);
        return mapObject;
      },
      {}
    );

    Object.keys(residentActivityMap).forEach(activityId => {
      Activities.update(
        { _id: activityId },
        {
          $set: { residentIds: residentActivityMap[activityId] },
        }
      );
    });
    ResidentActivityMappingCollection.remove({});
  },
});
