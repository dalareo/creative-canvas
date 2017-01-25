import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Boxes } from '../api/boxes.js';

import './box.js';
import './body.html';

Template.businessCanvas.onCreated(function businessCanvasOnCreated() {
  Meteor.subscribe('boxes');
});

Template.businessCanvas.helpers({
  boxes() {
    return Boxes.find();
  },
});

Template.businessCanvas.events({
  'change #templateSelect': function (event) {
    document.getElementById('bizcanvas').className = "";
    document.getElementById('bizcanvas').className = event.target.value;
  },
  'submit .new-box'(event) {
    // Prevent default browser form submit
    event.preventDefault()

    // Get value from form element
    const target = event.target;
    const text = target.text.value;
    const url = target.url.value;

    // Insert a box into the collection
    Meteor.call('boxes.insert', text, url);

    // Clear form
    target.text.value = '';
    target.url.value = '';
  },
});
