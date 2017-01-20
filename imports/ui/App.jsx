import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import Dragula from 'react-dragula';
import { Boxes } from '../api/boxes.js';
import Box from './Box.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);
  }

  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
    const url = ReactDOM.findDOMNode(this.refs.urlInput).value.trim();

    Meteor.call('boxes.insert', text, url);

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  renderBoxes() {
    let filteredBoxes = this.props.boxes;

    return filteredBoxes.map((box) => {

      return (
        <Box
          key={box._id}
          box={box}
        />
      );
    });
  };


  dragulaDecorator (componentBackingInstance) {
    if (componentBackingInstance) {
      let options = {
        isContainer: function (el) {
          return el.classList.contains('dropzone');
        }
      };
      // Do action after drop element
      let drake = Dragula([componentBackingInstance], options);
      drake.on('drop', function(el, target, source, sibling) {
          console.log('dropped');
          target.previousSibling.innerHTML = 'target';
          source.previousSibling.innerHTML = 'source';
        });
    }
  }


  render() {
    return (
      <div className="container" id="canvas">
        <header>
          <h1>
            Business Model Canvas
          </h1>

          <AccountsUIWrapper />

            <form
              className="new-box"
              onSubmit={this.handleSubmit.bind(this)} >
              <p>
                Create PAD:
                <a
                target="_blank" href="http://pad.educaas.io">New Pad</a>
              </p>
              <label>
                Element Title:
              </label>
              <input
                type="text"
                ref="textInput"
                placeholder="Add element title"
                />
              <label>
                PAD url:
              </label>
              <input
                type="url"
                ref="urlInput"
                placeholder="Add PAD url"
                />
              <input
                type="submit"
                value="Submit"
                />
            </form>
        </header>
        <p style={{display: 'none'}}></p>
        <div id="backlog" ref={this.dragulaDecorator}>
          {this.renderBoxes()}
        </div>
        <div id="bizcanvas">
          <div className="row" id="upper-row">
            <div className="col-md-2 col-md-offset-1" id="keyPartners">
              <h4>Key Partners</h4>
              <p>...</p>
              <div className="dropzone"></div>
            </div>
            <div className="col-md-2">
              <div className="row">
                <div className="col-xs-12" id="keyActivities">
                  <h4>Key Activities</h4>
                  <p>...</p>
                  <div className="dropzone"></div>
                </div>
                <div className="col-xs-12" id="keyResources">
                  <h4>Key Resources</h4>
                  <p>...</p>
                  <div className="dropzone"></div>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <h4>Value Propositions</h4>
              <p>...</p>
              <div className="dropzone"></div>
            </div>
            <div className="col-md-2">
              <div className="row">
                <div className="col-xs-12" id="customerRel">
                  <h4>Customer Rel</h4>
                  <p>...</p>
                  <div className="dropzone"></div>
                </div>
                <div className="col-xs-12" id="channels">
                  <h4>Channels</h4>
                  <p>...</p>
                  <div className="dropzone"></div>
                </div>
              </div>
            </div>
            <div className="col-md-2" id="customerSegments">
              <h4>Customer Segments</h4>
              <p>...</p>
              <div className="dropzone"></div>
            </div>
          </div>

          <div className="row" id="bottom-row">
            <div className="col-md-6" id="costStructure">
              <h4>Cost Structure</h4>
              <p>...</p>
              <div className="dropzone"></div>
            </div>
            <div className="col-md-6">
              <h4>Revenue Streams</h4>
              <p>...</p>
              <div className="dropzone"></div>
            </div>
          </div>
        </div>
      </div>

    );
  }

}

App.propTypes = {
  boxes: PropTypes.array.isRequired,
};

export default createContainer(() => {
  return {
    boxes: Boxes.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
}, App);
