var app = angular.module('NSApp');

app.controller("ProfileController", ['$location', '$scope', 'UserService', function ($location, $scope, UserService) {
	
	$scope.user = null;
	
	$scope.onLoad = function () {
		if (UserService.currentUser === true) {
			$location.path('/login');
		} else {
			$scope.user = UserService.currentUser;
			console.log($scope.user);
		}
	}
	$scope.onLoad();
	console.log($scope.user.username);
	
	$scope.updateProfile = function() {
}]);