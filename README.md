# G-App

Simple Application to display user genetic data.


### Prerequisites

The dependencies require to run to run this application:

NodeJs - v6.10.0

npm - v3.10.10

MySql - v10.1.21-MariaDB

### Folder strecture
```
<root-folder>
    -interface (Frontend serrver running on 8080 port)
        -application.js (Server file to start Frontend server)
        -run.bat (To start Frontend servers)
        -build.bat (To build Frontend servers)
        -resources (Frontend resources)
            -html
            -scripts
            -styles
    -services (Backend serrver  running on 8081 port)
        -application.js (Server file to start Backend server)
        -run.bat (To start Backend servers)
        -build.bat (To build Backend servers)
        -resources (Backend resources)
    -run.bat (To start both servers)
    -build.bat (To build both servers)
```


### Installing

The things requuired to setup this application:

1. Clone this repository from github
2. Run below commond in root folder from pre-build event
```
build.bat
```
3. Export gapp.sql (database) file from root folder of repository to database mysql
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
4. It will load login page. Please use below details for login
	Email : user@gmail.com
	Password: 12345678

## Authors

* **Hussain Hamdani** - [hussainhamdani](https://github.com/hussainhamdani)