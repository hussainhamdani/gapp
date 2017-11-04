(function () {
    'use strict';
 
    angular
        .module('APPLICATION')
        .controller('ProfileController', ProfileController);
 
    ProfileController.$inject = ['$location', 'CommonService'];
    function ProfileController($location, CommonService) {
        var vm = this;
		vm.user = {};
		var config = {
			url : 'user',
			method: 'GET'
		};
		CommonService.serviceCall(config).then(function success(response){
			vm.user = response.data[0];
		});
		var config = {
			url : 'results',
			method: 'GET'
		};
		CommonService.serviceCall(config).then(function success(response){
			vm.results = response.data[0];
		});
    }
 
})();