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

Template.businessCanvas.onRendered( function () {
    document.getElementById('bizcanvas').className = 'businessmodelcanvas';
});

Template.businessCanvas.events({
  'change #templateSelect': function (event) {
    const e = event.target;

    document.getElementById('bizcanvas').className = "";
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

    // Insert a box into the collection
    Meteor.call('boxes.insert', text, url);

    // Clear form
    target.text.value = '';
    target.url.value = '';
  },
});
