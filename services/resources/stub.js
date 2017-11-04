var mysql = require('mysql');
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
	var result = {MESSAGE: 'Not Found'};
	var resultStatus = 404;
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
	var result = {MESSAGE: 'Service Error'};
	var resultStatus = 404;
	var query = "SELECT * FROM `users` WHERE `vEmail` = '"+data.email+"' AND `vPassword` = '"+data.password+"' AND `eStatus` = 'Active'";
	dbConnection.query(query, function (error, result) {
		if (!error){
			if(typeof result !== 'undefined' && typeof result[0] !== 'undefined') {
				serverSession.email = result[0].vEmail;
				serverSession.userId = result[0].iUserId;
				var json_response = {MESSAGE: 'SUCCESS'};
				response.status(200).json(json_response).end();
			}
		} else {
			response.status(resultStatus).json(result).end();
		}
	});
}

module.exports = function (app, serverSession, uniqid) {

	app.get('/api/user', function (request, response) {
		var result = {MESSAGE: 'Not Found'};
		var resultStatus = 404;
		if(typeof serverSession !== 'undefined' && typeof serverSession.userId !== 'undefined' && serverSession.userId !== null) {
			var sql = "SELECT * FROM `users` WHERE `iUserId` = '"+serverSession.userId+"' AND `eStatus` = 'Active'";
			runQuery(sql, response);
		} else {
			response.status(resultStatus).json(result).end();
		}
    });

	app.get('/api/results', function (request, response) {
		var result = {MESSAGE: 'Not Found'};
		var resultStatus = 404;
		if(typeof serverSession !== 'undefined' && typeof serverSession.userId !== 'undefined' && serverSession.userId !== null) {
			var sql = "SELECT * FROM `genetic_results` WHERE `iUserId` = "+serverSession.userId;
			runQuery(sql, response);
		} else {
			response.status(resultStatus).json(result).end();
		}
    });

	app.get('/api/logout',function(request,response){
		var result = {MESSAGE: 'Not Found'};
		var resultStatus = 404;
		request.session.destroy(function(err) {
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
		var result = {MESSAGE: 'Not Found'};
		var resultStatus = 404;
		if(typeof request.body.email !== 'undefined' && request.body.email !== '' && typeof request.body.password !== 'undefined' && request.body.password !== '') {
			serverSession = request.session;
			createSession(request.body, request, response, serverSession);
		} else {
			var json_response = {MESSAGE: 'ERROR'};
			response.status(404).json(json_response).end();
		}
    });
};
