var app = angular.module('NSApp');

app.controller('SelfIdentifyController', ['$scope', 'SelfIdentifyService', function($scope, SelfIdentifyService) {
  $scope.blnFinished = false;
  $scope.arrTestData = SelfIdentifyService.getTestData();
  $scope.getValues = function() {
    $scope.blnFinished = SelfIdentifyService.processValues();
    $scope.arrResultData = SelfIdentifyService.returnTestValues();
    console.log($scope.resultData);
  }
}]);

app.service('SelfIdentifyService', ['$http', function($http) {
  var blnFinished = false;
  var arrReponses = [];
  var arrQuestions = [{
    question: 'Where is the state of Utah?',
    availableOptions: [{
      id: '1',
      name: 'Option A',
      optionWeight: {
        authoritarian: 4,
        libertarian: 0,
        left: 3,
        right: 1
      }
    }, {
      id: '2',
      name: 'Option B',
      optionWeight: {
        authoritarian: 4,
        libertarian: 0,
        left: 3,
        right: 1
      }
    }, {
      id: '3',
      name: 'Option C',
      optionWeight: {
        authoritarian: 4,
        libertarian: 0,
        left: 3,
        right: 1
      }
    }],
    selectedOption: {}
    //This sets the default value of the select in the ui
  }, {
    question: 'Where is the state of Wyoming?',
    availableOptions: [{
      id: '1',
      name: 'Option A',
      optionWeight: {
        authoritarian: 4,
        libertarian: 0,
        left: 3,
        right: 1
      }
    }, {
      id: '2',
      name: 'Option B',
      optionWeight: {
        authoritarian: 4,
        libertarian: 0,
        left: 3,
        right: 1
      }
    }, {
      id: '3',
      name: 'Option C',
      optionWeight: {
        authoritarian: 4,
        libertarian: 0,
        left: 3,
        right: 1
      }
    }],
    selectedOption: {}
  }];

  this.getTestData = function() {
    return arrQuestions;
  };

  this.processValues = function() {
    this.getTestValues();
    this.computeResult();
    this.saveUserResult();
    $blnFinished = true;
    return $blnFinished;
  };

  this.getTestValues = function() {
    console.log(arrQuestions);
    for (var i = 0; i < arrQuestions.length; i++) {
      arrReponses.push(arrQuestions[i].selectedOption);
    }
  };

  this.computeResult = function() {
    console.log(arrReponses);
  };

  this.saveUserResult = function() {

  };

  this.returnTestValues = function() {
    return arrReponses;
  };

}]);
