import { Template } from 'meteor/templating';

import { Boxes } from '../api/boxes.js';

import './box.html';

Template.box.events({
  'click .close'() {
    Boxes.remove(this._id);
  },
});
