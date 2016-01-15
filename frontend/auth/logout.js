var app = angular.module('NSApp');

app.controller("LogoutController", ['$location', '$scope', 'UserService', function($location, $scope, UserService) {
	
	$scope.logoff = function() {
		UserService.logout();
		
		$location.path('/');
		
	}
}]);