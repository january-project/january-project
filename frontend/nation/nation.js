var app = angular.module('NSApp');

app.controller("NationController", ['$location', '$scope', '$http', 'NationService', function ($location, $scope, $http, NationService) {
	
	$scope.userNation = [];
	
	$scope.submit = function (nation) {
		console.log('submitted data: '+nation.name);
		NationService.send(nation).then(function(response) {
			$scope.userNation = response.data;
		});
	};
		
	
}]);