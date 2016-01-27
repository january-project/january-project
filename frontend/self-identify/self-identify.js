var app = angular.module('NSApp');

app.controller('SelfIdentifyController', ['$scope', 'SelfIdentifyService', function($scope, SelfIdentifyService) {
  $scope.chartObject = {};
  SelfIdentifyService.checkData()
    .then(function(response) {
      console.log(response);
      if (typeof response !== "undefined") {
        if (Object.getOwnPropertyNames(response).length == 0) {
          $scope.blnFinished = false;
        } else {
          SelfIdentifyService.getChartObject()
            .then(function(response) {
              $scope.chartObject = response;
              console.log(response);
            })
          $scope.arrResultData = SelfIdentifyService.returnTestValues();
          $scope.blnFinished = true;
        }
      } else {
        $scope.blnFinished = false;
      }
    });

  SelfIdentifyService.getTestData()
    .then(function(response) {
      $scope.arrTestData = response;
    });
  $scope.objIdeologyQuestion = SelfIdentifyService.getSelfIdeologyData();
  $scope.getValues = function() {
    $scope.blnFinished = SelfIdentifyService.processValues();
    SelfIdentifyService.getChartObject()
      .then(function(response) {
        $scope.chartObject = response;
      })
    $scope.arrResultData = SelfIdentifyService.returnTestValues();
    console.log($scope.arrResultData);
  };
}]);

app.service('SelfIdentifyService', ['$http', function($http) {
  var blnFinished = false;
  var strBaseUrl = 'http://dev.sandbox.com:5000/api';
  var arrResponses = [];
  var objQuestionaireResult = {};
  var objChartObject = {};
  var objIdeologyQuestion = {
    question: 'Please select your political ideology.',
    availableOptions: [{
      id: '1',
      name: 'Anarchism'
    }, {
      id: '2',
      name: 'Communism'
    }, {
      id: '3',
      name: 'Marxism'
    }, {
      id: '4',
      name: 'Marxism-Leninism'
    }, {
      id: '5',
      name: 'Maoism'
    }, {
      id: '6',
      name: 'Liberal Conservatism'
    }, {
      id: '7',
      name: 'Libertarian Conservatism'
    }, {
      id: '8',
      name: 'Paleoconservatism'
    }, {
      id: '9',
      name: 'Neoconservatism'
    }, {
      id: '10',
      name: 'Progressivism'
    }, {
      id: '11',
      name: 'Liberal Socialism'
    }, {
      id: '12',
      name: 'Democratic Socialism'
    }, {
      id: '13',
      name: 'Social Democracy'
    }, {
      id: '14',
      name: 'Fascism'
    }, {
      id: '15',
      name: 'National Socialism'
    }, {
      id: '16',
      name: 'National Conservatism'
    }],
    selectedOption: {}
  };

  // var arrQuestions = [{
  //   question: 'What is your stance on abortion?',
  //   availableOptions: [{
  //     id: '1',
  //     name: 'All abortion should be illegal',
  //     optionWeight: {
  //       authoritarian: 3,
  //       controlledEconomy: 2,
  //       progressive: 0,
  //       nationalism: 2
  //     }
  //   }, {
  //     id: '2',
  //     name: "Abortion should be allowed but only when the mother's life is in danger",
  //     optionWeight: {
  //       authoritarian: 2,
  //       controlledEconomy: 2,
  //       progressive: 1,
  //       nationalism: 2
  //     }
  //   }, {
  //     id: '3',
  //     name: 'Abortion should be allowed for anyone still in their first trimester',
  //     optionWeight: {
  //       authoritarian: 1,
  //       controlledEconomy: 2,
  //       progressive: 3,
  //       nationalism: 2
  //     }
  //   }, {
  //     id: '4',
  //     name: 'Abortion should be allowed for anyone',
  //     optionWeight: {
  //       authoritarian: 0,
  //       controlledEconomy: 2,
  //       progressive: 4,
  //       nationalism: 2
  //     }
  //   }],
  //   selectedOption: {}
  //   //This sets the default value of the select in the ui
  // }];

  this.checkData = function() {
    return $http.get(strBaseUrl + '/ideology')
      .then(function(response) {
        objQuestionaireResult = response.data[0];
        return objQuestionaireResult;
      });
  };

  this.getTestData = function() {
    return $http.get(strBaseUrl + '/questions')
      .then(function(response) {
        //console.log(response.data);
        return response.data;
      });
  };

  this.getSelfIdeologyData = function() {
    return objIdeologyQuestion;
  }

  this.processValues = function() {
    this.getTestValues();
    this.computeResult();
    this.saveUserResult();
    $blnFinished = true;
    return $blnFinished;
  };

  this.getTestValues = function() {
    // console.log('Questions');
    // console.log(arrQuestions);
    arrResponses.push(objIdeologyQuestion.selectedOption);
    for (var i = 0; i < arrQuestions.length; i++) {
      arrResponses.push(arrQuestions[i].selectedOption);
    }
  };

  this.computeResult = function() {
    var strChosenPoliticalIdeology = arrResponses[0].name;
    var dblControlledEconomy = dblControlledEconomy || 0;
    var dblAuthoritarian = dblAuthoritarian || 0;
    var dblProgressive = dblProgressive || 0;
    var dblNationalism = dblNationalism || 0;
    // console.log("our response");
    // console.log(arrResponses);
    for (var i = 1; i < arrResponses.length; i++) {
      console.log(arrResponses);
      dblAuthoritarian += arrResponses[i].optionWeight.authoritarian;
      dblControlledEconomy += arrResponses[i].optionWeight.controlledEconomy;
      dblProgressive += arrResponses[i].optionWeight.progressive;
      dblNationalism += arrResponses[i].optionWeight.nationalism;
    }
    dblAuthoritarian = ((dblAuthoritarian / 4) / (arrResponses.length - 1));
    dblControlledEconomy = ((dblControlledEconomy / 4) / (arrResponses.length - 1));
    dblProgressive = ((dblProgressive / 4) / (arrResponses.length - 1));
    dblNationalism = ((dblNationalism / 4) / (arrResponses.length - 1));
    objQuestionaireResult = {
      "chosenIdeology": strChosenPoliticalIdeology,
      "authoritarian": dblAuthoritarian,
      "controlledEconomy": dblControlledEconomy,
      "progressive": dblProgressive,
      "nationalism": dblNationalism
    }
    console.log(objQuestionaireResult);
  };

  this.saveUserResult = function() {
    return $http.post(strBaseUrl + '/ideology', objQuestionaireResult).then(function(response) {
      return response;
    });
  };

  this.returnTestValues = function() {
    return objQuestionaireResult;
  };

  this.getChartObject = function() {
    console.log(objQuestionaireResult);
    var dblAverageAuthoritarian = 0;
    var dblAverageNationalism = 0;
    var dblAverageProgressive = 0;
    var dblAverageControlledEconomy = 0;
    return $http.get(strBaseUrl + '/ideology/' + objQuestionaireResult.chosenIdeology)
      .then(function(response) {
        var intArrayLength = response.data.length;
        for (var i = 0; i < intArrayLength; i++) {
          dblAverageAuthoritarian += response.data[i].authoritarian;
          dblAverageProgressive += response.data[i].progressive;
          dblAverageNationalism += response.data[i].nationalism;
          dblAverageControlledEconomy += response.data[i].controlledEconomy;
        }
        objAverageResult = {
          authoritarian: (dblAverageAuthoritarian / intArrayLength),
          progressive: (dblAverageProgressive / intArrayLength),
          nationalism: (dblAverageNationalism / intArrayLength),
          controlledEconomy: (dblAverageControlledEconomy / intArrayLength)
        };
        objChartObject = {
          data: {
            cols: [{
              id: "id-you",
              label: "Your Leanings",
              type: "string"
            }, {
              id: "s",
              label: "You",
              type: "number"
            }, {
              id: "id-average",
              label: "Chosen Ideology Average",
              type: "number"
            }],
            rows: [{
              c: [{
                v: "Authoritarianism"
              }, {
                v: objQuestionaireResult.authoritarian
              }, {
                v: objAverageResult.authoritarian
              }]
            }, {
              c: [{
                v: "Planned Economy"
              }, {
                v: objQuestionaireResult.controlledEconomy
              }, {
                v: objAverageResult.controlledEconomy
              }]
            }, {
              c: [{
                v: "Progressivism"
              }, {
                v: objQuestionaireResult.progressive
              }, {
                v: objAverageResult.progressive
              }]
            }, {
              c: [{
                v: "Nationalism"
              }, {
                v: objQuestionaireResult.nationalism
              }, {
                v: objAverageResult.nationalism
              }]
            }]
          },
          type: 'LineChart',
          options: {
            title: "",
            width: 1200,
            height: 800,
            curveType: "function",
            vAxis: {
              title: "Metric Rating",
              gridlines: {
                count: 5
              },
              viewWindow: {
                min: 0,
                max: 1
              }
            },
            hAxis: {
              title: "Indicators"
            },
            animation: {
              duration: 1000,
              easing: "out",
              startup: true
            },
            pointSize: 5
          }
        };
        return objChartObject;
      });
  }

}]);
