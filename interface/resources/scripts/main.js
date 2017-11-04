(function () {
    'use strict';
 
    angular
        .module('APPLICATION', ['ngRoute', 'ngCookies'])
        .config(config)
        .run(run);
 
    config.$inject = ['$routeProvider', '$locationProvider', '$qProvider'];
    function config($routeProvider, $locationProvider, $qProvider) {
		$qProvider.errorOnUnhandledRejections(false);
        $routeProvider
 
            .when('/login', {
                controller: 'LoginController',
                templateUrl: '../html/login.html',
                controllerAs: 'vm'
            })
 
            .when('/profile', {
                controller: 'ProfileController',
                templateUrl: '../html/profile.html',
                controllerAs: 'vm'
            })

			.otherwise({ redirectTo: '/login' });
    }
 
    run.$inject = ['$rootScope', '$location', '$cookies', '$http'];
    function run($rootScope, $location, $cookies, $http) {
		// keep user logged in after page refresh
        $rootScope.globals = $cookies.getObject('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
        }
 
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/profile']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
			console.log(restrictedPage);
			console.log(loggedIn);
			console.log((restrictedPage && !loggedIn));
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
    }
 
})();