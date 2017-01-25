import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Boxes } from '../api/boxes.js';

import './box.html';

Template.box.onRendered(function (event) {
  // refresh boxes positions
  var target = this.firstNode,
      // keep the dragged position in the data-x/data-y attributes
      x = target.getAttribute('data-x');
      y = target.getAttribute('data-y');

  // translate the element
  target.style.webkitTransform =
  target.style.transform =
    'translate(' + x + 'px, ' + y + 'px)';

  // update the posiion attributes
  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
});

Template.box.events({

  'mouseup .draggable, touchend .draggable'(event) {
    //console.log(this, Template.currentData());

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
