import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Boxes } from '../api/boxes.js';

import './box.js';
import './body.html';

Template.canvas.onCreated(function canvasOnCreated() {
  Meteor.subscribe('boxes');
});

Template.canvas.helpers({
  boxes() {
    return Boxes.find();
  },
});

// Set initial Template to Business Model Canvas

Template.canvas.onRendered( function () {
  document.getElementById('bizcanvas').className = 'businessmodelcanvas';
});

Template.canvas.events({
  'change #templateSelect': function (event) {
    const e = event.target;

    document.getElementById('bizcanvas').className = '';
    document.getElementById('templateName').innerHTML = "";

    document.getElementById('bizcanvas').className = e.value;
    document.getElementById('templateName').innerHTML = e.options[e.selectedIndex].text;
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
});
