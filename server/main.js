import { Meteor } from 'meteor/meteor';

import '../imports/api/boxes.js';

Router.route('/', function () {
  // render the Home template with a custom data context
  this.render('Home', {data: {title: 'Desing Thinking App'}});
});

// when you navigate to "/one" automatically render the template named "One".
Router.route('/canvas');

// when you navigate to "/two" automatically render the template named "Two".
Router.route('/help');

Meteor.startup(() => {
  // code to run on server at startup

});
