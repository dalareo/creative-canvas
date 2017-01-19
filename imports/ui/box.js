import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Boxes } from '../api/boxes.js';

import './box.html';

Template.box.events({
  'mouseup .draggable'(event) {

    // Get value from form element
    const target = event.target;
    //const text = target.firstChild;
    const dataX = target.getAttribute('data-x');
    const dataY = target.getAttribute('data-y');

    // console.log( text );

    // Update box position
    Meteor.call('boxes.update', this._id, dataX, dataY);
  },

  'click .close'() {
    Meteor.call('boxes.remove', this._id);
  },
});
