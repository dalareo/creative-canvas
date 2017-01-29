import '../imports/startup/accounts-config.js';
import '../imports/ui/draggable.js';
import '../imports/ui/body.js';

Router.route('/', function () {
  // render the Home template with a custom data context
  this.render('home', {data: {title: 'Desing Thinking App'}});
});

// when you navigate to "/one" automatically render the template named "One".
Router.route('/canvas');

// when you navigate to "/two" automatically render the template named "Two".
Router.route('/help');
