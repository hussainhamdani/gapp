var fs = require('fs');

function rDatabase() {
    var dbpath = 'resources/db/';
    var folderSupprator = '/';
    var relationalSupprator = '-';
    var fileFormat = '.txt';

    function createRecord(configuration) {
        var tablePath = dbpath + configuration['DATABASE'];
        if (!fs.existsSync(tablePath)) {
            fs.mkdirSync(tablePath);
        }

        tablePath = tablePath + '/' + configuration['TABLE'];
        if (!fs.existsSync(tablePath)) {
            fs.mkdirSync(tablePath);
        }

        fs.readdir(tablePath, (err, files) => {
            var lastInsertedId = 0;
            if(err) {
                throw err;
            } else {
                lastInsertedId = parseInt(files.length);
             tablePath = tablePath + folderSupprator + configuration['TABLE'] + relationalSupprator;
                insertRecprds(tablePath, configuration['RECORDS'], lastInsertedId);
            }
        });
    }

    function insertRecprds(tablePath, records, lastInsertedId) {
        if(records.length > 0) {
            for(var key in  records) {
                lastInsertedId++;
                var record = records[key];
                record['id'] = lastInsertedId;
                var filePath = tablePath + lastInsertedId + fileFormat;
                record = JSON.stringify(record);
                fs.appendFile(filePath, record, function (err) {
                  if (err) throw err;
                });
            }
        }
    }

    function getRecordById(configuration, res) {
       var tablePath = dbpath + configuration['DATABASE'] + folderSupprator + configuration['TABLE'] + folderSupprator + configuration['TABLE'] + relationalSupprator + configuration['ID'] + fileFormat;
       fs.readFile(tablePath, function(err, data) {
          res.writeHead(200, {'Content-Type': 'application/json'});
          res.write(data);
          res.end();
       });
    }

    function deleteRecordById(configuration) {
       var tablePath = dbpath + configuration['DATABASE'] + folderSupprator + configuration['TABLE'] + folderSupprator + configuration['TABLE'] + relationalSupprator + configuration['ID'] + fileFormat;
       if(fileExists(tablePath)) {
           fs.unlink(tablePath, function (err) {
             if (err) throw err;
           });
       }
       //console.log(tablePath);
    }

    function fileExists(filePath) {
        try{
            return fs.statSync(filePath).isFile();
        } catch (err) {
            return false;
        }
    }
    
    return {
        deleteRecordById : deleteRecordById,
        getRecordById: getRecordById,
        createRecord: createRecord        
    }
}

module.exports = function (app, serverSession, uniqid) {
	
	app.get('/api/user', function (request, response) {
		var result = {MESSAGE: 'Not Found'};
		var resultStatus = 404;
		if(typeof serverSession !== 'undefined' && typeof serverSession.email !== 'undefined' && serverSession.email !== null) {
			result.MESSAGE = 'SUCCESS';
			result.DATA = {
				email: serverSession.email
			};
			resultStatus = 200;
		}
		response.status(resultStatus).json(result).end();
    });

	app.get('/api/logout',function(request,response){
		var result = {MESSAGE: 'Not Found'};
		var resultStatus = 404;
		request.session.destroy(function(err) {
			if(!err) {
				result.MESSAGE = 'SUCCESS';
				resultStatus = 200;
			}
		});
		response.status(resultStatus).json(result).end();
	});

	app.post('/api/login', function (request, response) {
		console.log(request.session);
		if(typeof request.body.email !== 'undefined' && request.body.email !== '' && typeof request.body.password !== 'undefined' && request.body.password !== '') {
			serverSession = request.session;
			serverSession.email = request.body.email;
			serverSession.password = request.body.password;
			var json_response = {MESSAGE: 'SUCCESS'};
			response.status(200).json(json_response).end();
		} else {
			var json_response = {MESSAGE: 'ERROR'};
			response.status(404).json(json_response).end();
		}
    });
	
    // students
    app.get('/api/users/:id', function (req, res) {
        //req.body
        // get record by id
        var configuration = {
            'DATABASE': 'rockon',
            'TABLE': 'users',
            'ID' : 2
        };
        getRecordById(configuration, res);
    });

    app.post('/api/users', function (req, res) {
        // req.body
      var configuration = {
         'DATABASE': 'rockon',
         'TABLE': 'users',
         'RECORDS': [
            {
               name: 'Hussain',
               email: 'hussain@gmail.com'
            },
            {
               name: 'Abbas',
               email: 'abbas@gmail.com'
            },
            {
               name: 'Imran',
               email: 'imran@gmail.com'
            }
         ]
      };
      createRecord(configuration);
      res.json({'ststus' : 'CREATED'});
    });

    app.delete('/api/users/:id', function (req, res) {
        // get record by id
        configuration = {
            'DATABASE': 'rockon',
            'TABLE': 'users',
            'ID' : req.params.id
        };
        deleteRecordById(configuration);
        res.json({'ststus' : 'DELETED'});
    });
};
