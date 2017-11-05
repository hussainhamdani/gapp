var mysql = require('mysql');
var authentication = require('./authentication.js');
var applicationKey = 'TEMPAPPLICATIONKEY';

var dbConnection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "gapp"
});
dbConnection.connect(function(err) {
    if (err) {
        return;
    }
});

function runQuery(query, response) {
	var result = {MESSAGE: 'DATA NOT FOUND'};
	var resultStatus = 402;
	dbConnection.query(query, function (error, result) {
		if (!error){
			result.DATA = result;
			result.MESSAGE = 'SUCCESS';
			response.status(200).json(result).end();
		} else {
			response.status(resultStatus).json(result).end();
		}
	});
}

function createSession(data, request, response, serverSession) {
	var result = {MESSAGE: 'CONNECTION ERROR'};
	var resultStatus = 401;
	var query = "SELECT * FROM `users` WHERE `vEmail` = '"+data.email+"' AND `vPassword` = '"+data.password+"' AND `eStatus` = 'Active'";
	dbConnection.query(query, function (error, result) {
		if (!error){
			if(typeof result !== 'undefined' && typeof result[0] !== 'undefined') {
				var tempKey = data.email + applicationKey + data.password
				var authdataKey = authentication.encode(tempKey);
				var json_response = {
					MESSAGE: 'SUCCESS',
					DATA : {
						authdata : authdataKey
					}
				};

				serverSession.email = result[0].vEmail;
				serverSession.userId = result[0].iUserId;
				serverSession.authorization = authdataKey;

				response.status(200).json(json_response).end();
			} else {
				result = {MESSAGE: 'RECORD NOT FOUND'};
				response.status(200).json(result).end();
			}
		} else {
			response.status(resultStatus).json(result).end();
		}
	});
}

function checkAuthdata(request, serverSession) {
	var result = false;
	if(serverSession && request && serverSession.authorization && request.headers && request.headers.authorization && serverSession.authorization === request.headers.authorization) {
		result = true;
	}
	return result;
}

module.exports = function (app, serverSession, uniqid) {

	app.get('/api/user', function (request, response) {
		var authorised = checkAuthdata(request, serverSession);
		var result = {MESSAGE: 'SESSION EXPIRED'};
		var resultStatus = 403;

		if(authorised && typeof serverSession !== 'undefined' && typeof serverSession.userId !== 'undefined' && serverSession.userId !== null) {
			var sql = "SELECT `vFirstName` as `First Name`, `vLastName` as `Last Name`, `dDateOfBirth` as `Date of birth`, `vEmail` as `Email` FROM `users` WHERE `iUserId` = '"+serverSession.userId+"' AND `eStatus` = 'Active'";
			runQuery(sql, response);
		} else {
			response.status(resultStatus).json(result).end();
		}
    });

	app.get('/api/results', function (request, response) {
		var authorised = checkAuthdata(request, serverSession);
		var result = {MESSAGE: 'SESSION EXPIRED'};
		var resultStatus = 403;
		if(authorised && typeof serverSession !== 'undefined' && typeof serverSession.userId !== 'undefined' && serverSession.userId !== null) {
			var sql = "SELECT `vGeneticTestOne` as `Hair (with their roots still attached)`, `vGeneticTestTwo` as `Contents of an until now uncleaned electric razor`, `vGeneticTestThree` as `Finger nails`, `vGeneticTestFour` as `Tooth brush`, `vGeneticTestFive` as `Cigarette butts`, `vGeneticTestSix` as `Chewing gum`, `dTestDate` as `Date` FROM `genetic_results` WHERE `iUserId` = "+serverSession.userId;
			runQuery(sql, response);
		} else {
			response.status(resultStatus).json(result).end();
		}
    });

	app.get('/api/logout',function(request,response){
		var result = {MESSAGE: 'Not Found'};
		var resultStatus = 404;
		serverSession.destroy(function(err) {
			if(!err) {
				serverSession = {};
				result.MESSAGE = 'SUCCESS';
				resultStatus = 200;
				response.status(resultStatus).json(result).end();
			} else {
				response.status(resultStatus).json(result).end();
			}
		});
	});

	app.post('/api/login', function (request, response) {
		if(typeof request.body.email !== 'undefined' && request.body.email !== '' && typeof request.body.password !== 'undefined' && request.body.password !== '') {
			serverSession = request.session;
			createSession(request.body, request, response, serverSession);
		} else {
			var json_response = {MESSAGE: 'ERROR'};
			response.status(resultStatus).json(result).end();
		}
    });
};
