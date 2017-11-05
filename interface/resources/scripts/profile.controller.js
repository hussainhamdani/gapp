(function () {
    'use strict';
 
    angular
        .module('APPLICATION')
        .controller('ProfileController', ProfileController);
 
    ProfileController.$inject = ['$location', 'CommonService'];
    function ProfileController($location, CommonService) {
        var vm = this;
		vm.logout = logout;
		vm.user = {};
		
		function logout() {
			var logoutConfig = {
				url : 'logout',
				method: 'GET'
			};
			CommonService.ClearCredentials();
			CommonService.serviceCall(logoutConfig).then(function success(response){
				$location.path('/login');
			});
        };

		var config = {
			url : 'user',
			method: 'GET'
		};
		CommonService.serviceCall(config).then(function success(response){
			vm.user = response.data[0];
		});

		config = {
			url : 'results',
			method: 'GET'
		};
		CommonService.serviceCall(config).then(function success(response){
			vm.results = response.data[0];
		});
    }
 
})();