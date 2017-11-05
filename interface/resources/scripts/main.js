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
		$rootScope.messageType = '';
		$rootScope.messageText = '';
		// keep user logged in after page refresh
        $rootScope.globals = $cookies.getObject('globals') || {};

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
			var publicPages = ['/login'];
			var privatePages = ['/profile'];
			var currentPagePath = $location.path();
            // redirect to login page if not logged in and trying to access a restricted page
			var isLoggedIn = ($rootScope.globals.currentUser) ? true : false;
			var isPublicPage = (publicPages.indexOf(currentPagePath) > -1) ? true : false;
			var isPrivatePage = (privatePages.indexOf(currentPagePath) > -1) ? true : false;

			if(isLoggedIn){
				if(isPublicPage) {
					$location.path('/profile');
				}
			} else {
				if(isPrivatePage) {
					$location.path('/login');
				}
			}
        });
    }
 
})();