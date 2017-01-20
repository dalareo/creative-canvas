import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

export default class Box extends Component {
  deleteThisBox() {
    Meteor.call('boxes.remove', this.props.box._id);
    }

  render() {
    return (
      <div className="drag-drop">
        <p>{this.props.box.text}</p>
        <button className="removebox close" onClick={this.deleteThisBox.bind(this)}>
          &times;
        </button>
      </div>
    );
  }
}

  Box.propTypes = {
  // This component gets the box to display through a React prop.
  // We can use propTypes to indicate it is required
  box: PropTypes.object.isRequired,
};
