import { Template } from 'meteor/templating';

import { Boxes } from '../api/boxes.js';

import './body.html';

Template.body.helpers({
  boxes() {
    return Boxes.find({});
  },
});

Template.body.events({
  'click .createBox': function(){
    var i=1;
    mNewObj = document.createElement('div');
    mNewObj.className = "draggable drag-drop";
    mNewObj.id = "BOX" + i;
    mNewObj.style.visibility="show";
    mNewObj.innerText = document.getElementById("text").value;
    var input = document.createElement("button");
    input.type = "button";
    input.className = "removebox close";
    input.innerText = "x"
    mNewObj.appendChild(input);
    document.getElementById("backlog").appendChild(mNewObj);
    //mNewObj.setAttribute("data-x", 0);
    //mNewObj.setAttribute("data-y", 0);
    document.getElementById("text").value = "";
    i++;
  }
});

$(document).on('click', '.removebox', function () {
  $(this).parent().remove();
});
