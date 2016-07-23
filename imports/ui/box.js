import { Template } from 'meteor/templating';

import { Boxes } from '../api/boxes.js';

import './box.html';

Template.box.events({
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Boxes.update(this._id, {
      $set: { checked: ! this.checked },
    });
  },
  'click .close'() {
    Boxes.remove(this._id);
  },
});
