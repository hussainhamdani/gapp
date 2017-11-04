var app = angular.module('APPLICATION', []);
app.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);
app.controller('APPLICATIONCONTROLLER', function($scope, $http, $q) {
    $scope.password = '';
    $scope.email = '';
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
            serviceCall(config, data).then(function success(){
				alert('Login Success');
			},function error(){
				alert('Login Error');
			});
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
			var deferred = $q.defer();
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
                   'Content-Type': 'application/x-www-form-urlencoded'
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
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
					deferred.reject(response);
                }
            }
			return deferred.promise;
        }
    }
});