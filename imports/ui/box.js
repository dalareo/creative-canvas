import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Boxes } from '../api/boxes.js';

import './box.html';

Template.box.events({
  'mouseup .draggable'(event) {

    // Get value from form element
    const target = event.target;
    const x = target.getAttribute('data-x');
    const y = target.getAttribute('data-y');

    //console.log( text, this._id, dataX, dataY );

    // Update box position
    Meteor.call('boxes.update', this._id, x, y);
  },

  'click .close'() {
    Meteor.call('boxes.remove', this._id);
  },
});
