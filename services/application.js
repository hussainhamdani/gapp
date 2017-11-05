var hour = 60000;
var expires = new Date(Date.now() + hour);
var serverSession = {};
var sessionConfiguration = {
	secret: '8HJHJK7398KJHKJH27',
	cookie: {
		maxAge: hour,
		expires : expires
	}
};
var port = process.env.PORT || 8081;

var express = require('express');
var session = require('express-session');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var uniqid = require('uniqid');

var app = express();

// Configuration
app.use(express.static('./public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

// Session Configuration
app.use(session(sessionConfiguration));

// apis
require('./resources/stub.js')(app, serverSession, uniqid);

// listen
app.listen(port);
console.log("Services listening on port: " + port);