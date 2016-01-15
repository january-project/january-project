var app = angular.module('NSApp');

app.controller("NationController", ['$location', '$scope', '$http', 'NationService', 'UserService', function ($location, $scope, $http, NationService, UserService) {
	
	$scope.userNation = [];
	$scope.loggedIn = false;
	
	$scope.submit = function (nation) {
		console.log('submitted data: '+nation.name);
		NationService.send(nation).then(function(response) {
			$scope.userNation = response.data;
		});
	};
	
	$scope.loggedInChecker = function() {
		if (UserService.currentUser == null) {
			$scope.loggedIn = false;
		} else {
			$scope.loggedIn = true;
		}
	}
	
	$scope.loggedInChecker();
	
}]);