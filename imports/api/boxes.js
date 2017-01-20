import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check'

export const Boxes = new Mongo.Collection('boxes');

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

  'boxes.insert'(text, pad_url) {
    check(text, String);
    check(pad_url, String);

    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Boxes.insert({
      text,
      pad_url,
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
