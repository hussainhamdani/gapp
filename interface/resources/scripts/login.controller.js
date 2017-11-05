(function () {
    'use strict';
 
    angular
        .module('APPLICATION')
        .controller('LoginController', LoginController);
 
    LoginController.$inject = ['$location', 'CommonService'];
    function LoginController($location, CommonService) {
        var vm = this;
 
        vm.login = login;
		vm.email = '';
		vm.password = '';
 
		CommonService.ClearCredentials();
        function login() {
			CommonService.Login(vm.email, vm.password).then(function success(data){
				$location.path('/profile');
			},function error(response){
			});
        };
    }
 
})();