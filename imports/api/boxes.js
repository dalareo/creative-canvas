import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check'

export const Boxes = new Mongo.Collection('boxes');

Meteor.methods({
  'boxes.update'(boxId, dataX, dataY) {
    check(boxId, String);
    //check(text, Match.any());
    check(dataX, String);
    check(dataY, String);

    // Make sure the user is logged in before moving a box
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Boxes.update(boxId,{
      //text,
      dataX,
      dataY,
    });
  },

  'boxes.insert'(text) {
    check(text, String);

    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Boxes.insert({
      text,
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
