(function () {
    'use strict';
 
    angular
        .module('APPLICATION')
        .factory('CommonService', CommonService);
 
    CommonService.$inject = ['$http', '$cookies', '$rootScope', '$timeout', '$q', '$location'];
    function CommonService($http, $cookies, $rootScope, $timeout, $q, $location) {
        var service = {};
 
        service.Login = Login;
        service.serviceCall = serviceCall;
        service.ClearCredentials = ClearCredentials;
 
        return service;
		
		function dataToString(data) {
            var string = '';
            for(var key in data) {
                string = (string !== '') ? (string + '&' ): '';
                string = string + key + '=' + data[key];
            }
            return string
        }

		function serviceCall(config, data) {
			var deferred = $q.defer();
            if(typeof config.url !== undefined && config.url !== null && config.url !== '') {
				// Get header
				var globals = $cookies.getObject('globals') || {};
				var currentUser = globals.currentUser || {};
                // Configuration object
                var serviceConfiguration = {};

                // Generating url
                serviceConfiguration.url = 'http://localhost:8081/api/' + config.url;

                // Appending Data To Service Request
                if(typeof data !== 'undefined' && data !== null) {
                    serviceConfiguration.data = dataToString(data);
                }

                // Appending Method Type To Service Request
                serviceConfiguration.method = (typeof config.method !== 'undefined' && config.method !== null) ? config.method : 'GET';

                // Appending Header To Service Request
                var headers = {
                   'Content-Type': 'application/x-www-form-urlencoded',
				   'Authorization': (currentUser.authdata || 'PUBLIC')
                };
                serviceConfiguration.headers = (typeof config.headers !== 'undefined' && config.headers !== null) ? config.headers : headers;

                // Trigger api call
                $http(serviceConfiguration).then(successCallback, errorCallback);

                // Success call back
                function successCallback(response) {
                    // this callback will be called asynchronously
                    // when the response is available
					deferred.resolve(response);
                }

                // Error call back
                function errorCallback(response) {
					if(response.status === 403) {
						ClearCredentials();
					}
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
					deferred.reject(response);
                }
            }
			return deferred.promise;
        }
 
        function Login(email, password) {
			var deferred = $q.defer();
			var data = {
                email : email,
                password : password
            };
            var config = {
                url : 'login',
                method: 'POST'
            };
            serviceCall(config, data).then(function success(data){
				console.log('Login Scusses');
				console.log(data.data);
				if(typeof data.data !== 'undefined' && typeof data.data.MESSAGE !== 'undefined' && data.data.MESSAGE === 'SUCCESS') {
					var authdata = data.data.DATA.authdata;
					$rootScope.globals = {
		                currentUser: {
		                    email: email,
		                    authdata: authdata
		                }
		            };

		            // store user details in globals cookie that keeps user logged in for 1 week (or until they logout)
		            var cookieExp = new Date();
		            cookieExp.setDate(cookieExp.getDate() + 7);
		            $cookies.putObject('globals', $rootScope.globals, { expires: cookieExp });
					$rootScope.messageType = 'success';
					$rootScope.messageText = 'Indicates a successful or positive action.';
					deferred.resolve(data.data);
				} else {
					deferred.reject(data.data);
					$rootScope.messageType = 'warning';
					$rootScope.messageText = 'Please enter valid data';
				}
			},function error(response){
				$rootScope.messageType = 'warning';
				$rootScope.messageText = 'Bad service request, please try again';
				deferred.reject(response);
			});
			return deferred.promise;
        }

        function ClearCredentials() {
            $rootScope.globals = {};
            $cookies.remove('globals');
			$location.path('/login');
        }
    }
})();