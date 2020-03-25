import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

ResidentActivityMapping = new Mongo.Collection(
  'residentActivityMapping'
);

const mappingSchema = new SimpleSchema({
  residentId: {
    type: String,
    autoform: {
      readonly() {
        /* a mapping cannot be edited */
        return !!this.docId;
      },
    },
  },
  activityId: {
    type: String,
    autoform: {
      readonly() {
        /* A mapping cannot be edited */
        return !!this.docId;
      },
    },
  },

  engagementLevel: {
    type: SimpleSchema.Integer,
    min: 1,
    max: 3,
    optional: true,
  },
});

ResidentActivityMapping.attachSchema(mappingSchema);

export const ResidentActivityMappingCollection = ResidentActivityMapping;
