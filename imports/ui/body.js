import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Boxes } from '../api/boxes.js';
import { Backgrounds } from '../api/backgrounds.js';

import './box.js';
import './body.html';
import './background.html';

Template.canvas.onCreated(function canvasOnCreated() {
  Meteor.subscribe('boxes');
  Meteor.subscribe('backgrounds');
});

Template.canvas.helpers({
  boxes() {
    return Boxes.find();
  },
  backgrounds() {
    return Backgrounds.find();
  },
});

Template.canvas.events({
  'submit #setBackground': function (event) {
    event.preventDefault()

    const i = event.target;
    const url = i.imageUrl.value;

    // Set template background URL
    Meteor.call('backgrounds.insert', url);

    // Clear form
    i.imageUrl.value = '';
  },
  'submit .new-box'(event) {
    // Prevent default browser form submit
    event.preventDefault()

    // Get value from form element
    const target = event.target;
    const text = target.text.value;
    const url = target.url.value;
    const color = target.colorSelect.options[target.colorSelect.selectedIndex].value;

    // Insert a box into the collection
    Meteor.call('boxes.insert', text, url, color);

    // Clear form
    target.text.value = '';
    target.url.value = '';
  },
  'click .clear-canvas'(event) {
    Meteor.call('removeAllBoxes');
    Meteor.call('removeBackgrounds');
  }
});
