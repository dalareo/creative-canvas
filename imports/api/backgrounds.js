import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check'

export const Backgrounds = new Mongo.Collection('backgrounds');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('backgrounds', function backgroundsPublication() {
    return Backgrounds.find();
  });
}

Meteor.methods({
  'backgrounds.insert'(background_url) {
    check(background_url, String);

    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Backgrounds.insert({
      _id: 'id',
      background_url,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },
  'backgrounds.remove'(backgroundId) {
    check(backgroundId, String);

    // Make sure the user is logged in before removing a box
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Backgrounds.remove(backgroundId);
  },
  removeBackgrounds: function() {
    return Backgrounds.remove({});
  }
});
