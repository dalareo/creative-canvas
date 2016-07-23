import { Template } from 'meteor/templating';

import { Boxes } from '../api/boxes.js';

import './box.js';
import './body.html';

Template.body.helpers({
  boxes() {
    return Boxes.find({});
  },
});

Template.body.events({
  'submit .new-box'(event) {
    // Prevent default browser form submit
    event.preventDefault()

    // Get value from form element
    const target = event.target;
    const text = target.text.value;

    // Insert a box into the collection
    Boxes.insert({
      text,
      createdAt: new Date(), // current time
    });

    // Clear form
    target.text.value = '';
  },
});
