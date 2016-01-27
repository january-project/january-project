var app = angular.module('NSApp');

app.controller("ProfileController", ['$location', '$scope', 'UserService', function ($location, $scope, UserService) {
	
	$scope.user = UserService.currentUser;
	$scope.show = true;
	
	$scope.onLoad = function () {
		if (UserService.currentUser === null) {
			$location.path('/login');
		} else {
			$scope.user = UserService.currentUser;
			console.log($scope.user);
		}
	};
	$scope.onLoad();
	console.log($scope.user.username);
	
	$scope.updateProfile = function() {
		if($scope.show === true) {
			$scope.show = false;
		} else {
			$scope.show = true;
		}
	};
	
	$scope.change = function(changeUser, newPassword) {
		$scope.show = true;
		changeUser.password = newPassword;
		UserService.changingUser(changeUser).then(function(response) {
			UserService.currentUser = response.data;
			$scope.user = UserService.currentUser;
		});
	};
	
}]);