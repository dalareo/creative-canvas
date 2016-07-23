import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Boxes } from '../api/boxes.js';

import './box.html';

Template.box.events({
  'click .close'() {
    Meteor.call('boxes.remove', this._id);
  },
});
