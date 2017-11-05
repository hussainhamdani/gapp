# Project Title

Simple Application to display user genetic data.


### Prerequisites

The dependencies require to run to run this application:

NodeJs - v6.10.0

npm - v3.10.10

MySql - v10.1.21-MariaDB


### Installing

The things requuired to setup this application:

1. Clone this repository from github
2. Run below commond in root folder from pre-build event
```
build.bat
```
3. Export gapp.sql(database) file in root folder of repository to database mysql
4. Set MySql server configuration at <root folder>/services/resources/configuration.js below properties
```
{
	dbHost: 'localhost',
	dbUser: 'username',
	dbPassword: 'password'
}
```

### Installing

To start frontend and backend servers, execute below steps:
1. Run this commond in root folder.
```
run.bat
```
2. Then you can see two servers running on 8080, 8081 ports.
3. Please hit below url in browser to see user interface.
```
http://localhost:8080/
```

## Authors

* **Hussain Hamdani** - [hussainhamdani](https://github.com/hussainhamdani)