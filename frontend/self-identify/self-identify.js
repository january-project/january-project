var app = angular.module('NSApp');

app.controller('SelfIdentifyController', ['$scope', 'SelfIdentifyService', function($scope, SelfIdentifyService) {
  $scope.chartObject = {};
  SelfIdentifyService.checkData()
    .then(function(response) {
      if (typeof response !== "undefined") {
        if (Object.getOwnPropertyNames(response).length == 0) {
          $scope.blnFinished = false;
        } else {
          SelfIdentifyService.getChartObject()
            .then(function(response) {
              $scope.chartObject = response;
            })
          $scope.arrResultData = SelfIdentifyService.returnTestValues();
          $scope.blnFinished = true;
        }
      } else {
        $scope.blnFinished = false;
      }
    });

  $scope.arrTestData = SelfIdentifyService.getTestData();
  $scope.objIdeologyQuestion = SelfIdentifyService.getSelfIdeologyData();
  $scope.getValues = function() {
    $scope.blnFinished = SelfIdentifyService.processValues();
    SelfIdentifyService.getChartObject()
      .then(function(response) {
        $scope.chartObject = response;
      })
    $scope.arrResultData = SelfIdentifyService.returnTestValues();
  };
}]);
