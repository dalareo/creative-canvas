import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check'

export const Boxes = new Mongo.Collection('boxes');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('boxes', function boxesPublication() {
    return Boxes.find();
  });
}

Meteor.methods({
  'boxes.update'(boxId, xValue, yValue) {
    check(boxId, String);
    check(xValue, String);
    check(yValue, String);

    // Make sure the user is logged in before moving a box
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Boxes.update(boxId, { $set: {
      dataX: xValue,
      dataY: yValue
    }
  });
  },

  'boxes.insert'(text, pad_url, color) {
    check(text, String);
    check(pad_url, String);
    check(color, String);

    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Boxes.insert({
      text,
      pad_url,
      color,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },
  'boxes.remove'(boxId) {
    check(boxId, String);

    // Make sure the user is logged in before removing a box
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Boxes.remove(boxId);
  },
});
