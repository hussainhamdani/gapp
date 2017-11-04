var app = angular.module('APPLICATION', []);
app.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);
app.controller('APPLICATIONCONTROLLER', function($scope, $http) {
	$scope.password = '45678765';
    $scope.email = 'hussain.hamdani@gmail.com';
	$scope.loginAction = function() {
		if($scope.email !== '' && $scope.password !== '') {
			var data = {
				email : $scope.email,
				password : $scope.password
			};
			var config = {
				url : 'login',
				method: 'POST'
			};

			/*$http.get('http://localhost:8081/api/user', function(data) {
				console.log(data);
			});*/
			serviceCall(config, data);
		}
		
		function dataToString(data) {
			var string = '';
			for(var key in data) {
				string = (string !== '') ? (string + '&' ): '';
				string = string + key + '=' + data[key];
			}
			return string
		}

		function serviceCall(config, data) {
			if(typeof config.url !== undefined && config.url !== null && config.url !== '') {
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
				   //'Content-Type': 'application/x-www-form-urlencoded'
				   'Content-Type': 'application/x-www-form-urlencoded'
				};
				serviceConfiguration.headers = (typeof config.headers !== 'undefined' && config.headers !== null) ? config.headers : headers;

				// Trigger api call
				$http(serviceConfiguration).then(successCallback, errorCallback);

				// Success call back
				function successCallback(response) {
					// this callback will be called asynchronously
					// when the response is available
					$http.get('http://localhost:8081/api/user', function(data) {
						console.log(data);
					});
				}

				// Error call back
				function errorCallback(response) {
					// called asynchronously if an error occurs
					// or server returns response with an error status.
				}
			}
		}
	}
});