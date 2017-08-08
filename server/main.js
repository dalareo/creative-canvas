import { Meteor } from 'meteor/meteor';

import '../imports/api/boxes.js';
import '../imports/api/backgrounds.js';

Router.route('/', function () {
  // render the Home template with a custom data context
  this.render('Home', {data: {title: 'Desing Thinking App'}});
});

// when you navigate to "/one" automatically render the template named "One".
Router.route('/canvas');

// when you navigate to "/two" automatically render the template named "Two".
Router.route('/help');

// LDAP settings
LDAP.bindValue = function (usernameOrEmail, isEmailAddress, FQDN) {
    return ((isEmailAddress) ? usernameOrEmail : 'CN=' + usernameOrEmail + ',CN=users,OU=groups,DC=educaas,DC=io');
}

LDAP.generateSettings = function (request) {
    return {
        "serverDn": "CN=" + request.username + ",CN=users,OU=groups,DC=educaas,DC=io",
        "serverUrl": "ldap://139.162.204.94:389",
        "whiteListedFields": [ "uid", "cn", "givenName", "mail"],
        "autopublishFields": [ "givenName"],
        "searchField": [ "cn" ],
        "searchValueType": [ "username" ]
        };
}

LDAP.filter = function (isEmailAddress, usernameOrEmail, FQDN) { return '(&(' + ((isEmailAddress) ? 'mail' : 'cn') + '=' + usernameOrEmail + ')(objectClass=inetOrgPerson))'; }

//LDAP.tryDBFirst = true;


Meteor.startup(() => {
  // code to run on server at startup
});
