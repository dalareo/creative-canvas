import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Boxes } from '../api/boxes.js';

import './box.html';

Template.box.events({

  'mouseup .draggable, touchend .draggable'(event) {

    // Get value from form element
    const target = event.target.parentElement;
    const x = target.getAttribute('data-x');
    const y = target.getAttribute('data-y');

    // Update box position
    Meteor.call('boxes.update', this._id, x, y);
  },

  'click .removebox'() {
    Meteor.call('boxes.remove', this._id);
  },
});
