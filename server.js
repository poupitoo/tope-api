'use strict';

// Module dependencies.
var express = require('express');

var app = express();


// Express Configuration
require('./lib/config/express')(app);

// Controllers
var api = require('./lib/controllers/api'),
		user = require('./lib/controllers/models/user'),
		top = require('./lib/controllers/models/top'),
		mail = require('./lib/controllers/mailserver'),
    index = require('./lib/controllers');

// Server Routes
app.get('/api/awesomeThings', api.awesomeThings);


//Users
app.get('/api/users', user.getUsers);
app.post('/api/user', user.createUser);
app.put('/api/user/:id',user.updateUserInfo);


//Terminals
app.get('/api/terminals', user.getTerminals);
app.post('/api/terminal', user.createTerminal);
app.put('/api/terminal/:id',user.updateTerminalInfo);



//Top
app.get('/api/tap/:userId/timestamp/:timestamp', top.checkTop);


//Synchronisation
app.get('/api/timestamp', api.timestamp);

//Mail
app.get('/api/mail/:userEmail',mail.sendMail);

//app.post('/api/user',api.)


// app.get('/partials/*', index.partials);
// app.get('/*', index.index);

// Start server
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Express server listening on port %d in %s mode', port, app.get('env'));
});

// Expose app
exports = module.exports = app;