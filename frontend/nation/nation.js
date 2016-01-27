var app = angular.module('NSApp');

app.controller("NationController", ['$location', '$scope', '$http', 'NationService', 'UserService', function ($location, $scope, $http, NationService, UserService) {
	
	$scope.userNation = '';
	$scope.loggedIn = false;
	$scope.user = UserService.currentUser;
	$scope.flagArray = [];
	$scope.isNation = false;
	$scope.govType = ['Representative Democracy', 'Direct Democracy', 'Absolute Monarchy', 'Constitutional Monarchy', 'Military Dictatorship', 'Presidential Dictatorship', 'Fascist Dictatorship', 'Proletarian Dictatorship', 'Constitutional Dictatorship'];
	$scope.article = '';
	
	$scope.submit = function (nation) {
		console.log(nation);
		NationService.send(nation).then(function(response) {
			NationService.currentNation = response.data;
			$scope.userNation = NationService.currentNation;
			$scope.isNation = true;
			$location.path('/nation/'+$scope.userNation._id);
		});
	};
	
	$scope.loggedInChecker = function() {
		if (UserService.currentUser === null) {
			$scope.loggedIn = false;
		} else {
			$scope.loggedIn = true;
			$scope.getNation($scope.user);
		}
		
	}
	
	$scope.getNation = function(user) {
		NationService.getNation(user).then(function(response) {
			if (response.data._id === undefined) {
				$scope.userNation = null;
				
			}else {
				$scope.userNation = response.data;
				$location.path('/nation/'+$scope.userNation._id);
			}
		});
	}
	
	$scope.gettingFlags = function() {
		NationService.getFlags().then(function(response) {
			
			$scope.flagArray = response.data;
		});
	};
	
	$scope.gettingFlags();
	$scope.loggedInChecker();
	
	
	console.log($scope.loggedIn);
}]);