var app = angular.module('NSApp');

app.service('SelfIdentifyService', ['$http', function($http) {

  // Sets service variables.
  var blnFinished = false;
  var strBaseUrl = 'http://dev.sandbox.com:5000/api';
  var arrResponses = [];
  var objQuestionaireResult = {};
  var objChartObject = {};
  var arrQuestions = [];
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

  // Checks to see if this user has already taken the test and created a result object.
  this.checkData = function() {
    return $http.get(strBaseUrl + '/ideology')
      .then(function(response) {
        objQuestionaireResult = response.data[0];
        return objQuestionaireResult;
      });
  };

  // Returns the test questions.
  this.getTestData = function() {
    arrQuestions = [{
        question: 'What is your stance on abortion?',
        availableOptions: [{
          id: '1',
          name: 'All abortion should be illegal',
          optionWeight: {
            authoritarian: 3,
            controlledEconomy: 2,
            progressive: 0,
            nationalism: 2
          }
        }, {
          id: '2',
          name: "Abortion should be allowed but only when the mother's life is in danger",
          optionWeight: {
            authoritarian: 2,
            controlledEconomy: 2,
            progressive: 1,
            nationalism: 2
          }
        }, {
          id: '3',
          name: 'Abortion should be allowed for anyone still in their first trimester',
          optionWeight: {
            authoritarian: 1,
            controlledEconomy: 2,
            progressive: 3,
            nationalism: 2
          }
        }, {
          id: '4',
          name: 'Abortion should be allowed in all cases',
          optionWeight: {
            authoritarian: 0,
            controlledEconomy: 2,
            progressive: 4,
            nationalism: 2
          }
        }],
        selectedOption: {}
        //This sets the default value of the select in the ui
      }, {
        question: 'Do you support the legalization of same-sex marriage?',
        availableOptions: [{
          id: '1',
          name: 'No. Marriage is between a Man and a Woman',
          optionWeight: {
            authoritarian: 4,
            controlledEconomy: 2,
            progressive: 0,
            nationalism: 2
          }
        }, {
          id: '2',
          name: 'Marriage should not have any government involvement and should be between the people getting married',
          optionWeight: {
            authoritarian: 0,
            controlledEconomy: 2,
            progressive: 1,
            nationalism: 2
          }
        }, {
          id: '3',
          name: 'Religious instituions should be forced to perform same-sex marriages even if it goes against their doctrines',
          optionWeight: {
            authoritarian: 4,
            controlledEconomy: 2,
            progressive: 3,
            nationalism: 2
          }
        }],
        selectedOption: {}
      }, {
        question: 'Economic globalization is ultimately a good thing',
        availableOptions: [{
          id: '1',
          name: 'Yes. Globalization mostly benefits the countries invovled',
          optionWeight: {
            authoritarian: 2,
            controlledEconomy: 1,
            progressive: 3,
            nationalism: 0
          }
        }, {
          id: '2',
          name: 'No. Globalization erodes our national community and identity and weakens our nation and our people',
          optionWeight: {
            authoritarian: 2,
            controlledEconomy: 3,
            progressive: 2,
            nationalism: 4
          }
        }, {
          id: '3',
          name: 'No. Globalization exploits the poorest people on the planet and increases social inequality',
          optionWeight: {
            authoritarian: 2,
            controlledEconomy: 3,
            progressive: 3,
            nationalism: 0
          }
        }],
        selectedOption: {}
      }, {
        question: 'What is your stance on the legalization of drugs?',
        availableOptions: [{
          id: '1',
          name: 'The government has no right to tell people what they can put into their bodies. All drugs should be legalized',
          optionWeight: {
            authoritarian: 0,
            controlledEconomy: 2,
            progressive: 2,
            nationalism: 1
          }
        }, {
          id: '2',
          name: "It's ok if marijuana is legalized but other drugs such as heroin and methamphetamine should stay illegal",
          optionWeight: {
            authoritarian: 1,
            controlledEconomy: 2,
            progressive: 3,
            nationalism: 2
          }
        }, {
          id: '3',
          name: 'Allowing marijuana or any other drugs to be legalized would be detrimental to society and so should stay illegal',
          optionWeight: {
            authoritarian: 2,
            controlledEconomy: 2,
            progressive: 2,
            nationalism: 3
          }
        }],
        selectedOption: {}
      }, {
        question: 'What is the result of disparities in social and economic outcomes of different ethnic or racial groups?',
        availableOptions: [{
          id: '1',
          name: 'The differences are caused mostly or entirely by genetic factors within those gropus',
          optionWeight: {
            authoritarian: 2,
            controlledEconomy: 2,
            progressive: 3,
            nationalism: 4
          }
        }, {
          id: '2',
          name: "The differences are the result of the groups own culture holding them back from achieving an equality of outcomes",
          optionWeight: {
            authoritarian: 2,
            controlledEconomy: 2,
            progressive: 2,
            nationalism: 2
          }
        }, {
          id: '3',
          name: 'The differences are the result of institutional oppression in society or a legacy of colonialism',
          optionWeight: {
            authoritarian: 2,
            controlledEconomy: 2,
            progressive: 3,
            nationalism: 0
          }
        }],
        selectedOption: {}
      }, {
        question: 'How should the economy be managed?',
        availableOptions: [{
          id: '1',
          name: 'There should be as little governmental influence in the economy as possible. A free market will oraganize prodcution and distribution of goods and services in a way that is the most beneficial to society',
          optionWeight: {
            authoritarian: 2,
            controlledEconomy: 0,
            progressive: 3,
            nationalism: 0
          }
        }, {
          id: '2',
          name: "The government should occasionally take action to help smooth out market cycles and guide the market in a direction that is good for society",
          optionWeight: {
            authoritarian: 2,
            controlledEconomy: 1,
            progressive: 2,
            nationalism: 1
          }
        }, {
          id: '3',
          name: "The commanding heights of the economy should be nationalized and directed to benefit the nation and not a small group of capitalist elites",
          optionWeight: {
            authoritarian: 2,
            controlledEconomy: 3,
            progressive: 2,
            nationalism: 2
          }
        }, {
          id: '4',
          name: 'Most or all economic activity should be directed by the government for the benefit of society',
          optionWeight: {
            authoritarian: 3,
            controlledEconomy: 4,
            progressive: 2,
            nationalism: 2
          }
        }],
        selectedOption: {}
      }, {
        question: 'What level of involvement should the government have in education?',
        availableOptions: [{
          id: '1',
          name: 'There should be nationwide standards directed at the federal level that all schools must comply with',
          optionWeight: {
            authoritarian: 3,
            controlledEconomy: 2,
            progressive: 4,
            nationalism: 2
          }
        }, {
          id: '2',
          name: "Nationwide federal standards should be in place but local school systems can use their own standards as long as they meet or exceed federal standards",
          optionWeight: {
            authoritarian: 2,
            controlledEconomy: 2,
            progressive: 3,
            nationalism: 2
          }
        }, {
          id: '3',
          name: "Standards for education should be dictated at the local level so the local community has the most say in how the education system works in their own community",
          optionWeight: {
            authoritarian: 2,
            controlledEconomy: 2,
            progressive: 0,
            nationalism: 2
          }
        }],
        selectedOption: {}
      }, {
        question: 'How do you feel about immigration?',
        availableOptions: [{
          id: '1',
          name: 'We should stop immigration. The country has 320 million people, companies should have no problem finding skilled and unskilled workers. Immigrants are also refusing to assimilate and eroding the nations culture',
          optionWeight: {
            authoritarian: 4,
            controlledEconomy: 2,
            progressive: 2,
            nationalism: 4
          }
        }, {
          id: '2',
          name: "Immigration should be restriced to members of the nations primary ethnic group",
          optionWeight: {
            authoritarian: 2,
            controlledEconomy: 2,
            progressive: 2,
            nationalism: 4
          }
        }, {
          id: '3',
          name: "Immigration should be restriced to skilled immigrants that are needed in industries that have a labor shortage",
          optionWeight: {
            authoritarian: 2,
            controlledEconomy: 2,
            progressive: 3,
            nationalism: 2
          }
        }, {
          id: '4',
          name: "Immigration should be open to all people, skilled or unskilled, but there should be a cap on the number of immigrants per year",
          optionWeight: {
            authoritarian: 2,
            controlledEconomy: 2,
            progressive: 3,
            nationalism: 1
          }
        }, {
          id: '5',
          name: "Immigration should be encouraged. We should have open door immigration, allowing all people who desire to come here",
          optionWeight: {
            authoritarian: 3,
            controlledEconomy: 2,
            progressive: 4,
            nationalism: 0
          }
        }],
        selectedOption: {}
      }, {
        question: 'How should the country treat people from different cultures and ethnic groups?',
        availableOptions: [{
          id: '1',
          name: 'People from a different ethnic group have no place in our society and laws should be passed that encourage them to leave',
          optionWeight: {
            authoritarian: 4,
            controlledEconomy: 2,
            progressive: 2,
            nationalism: 4
          }
        }, {
          id: '2',
          name: "People from different ethnic groups should be encouraged to assimilate into the primary culture",
          optionWeight: {
            authoritarian: 2,
            controlledEconomy: 2,
            progressive: 2,
            nationalism: 3
          }
        }, {
          id: '3',
          name: "People from different ethnic groups should not be forced to assimilate. They should be allowed to keep their culture and society should try to accommodate them",
          optionWeight: {
            authoritarian: 2,
            controlledEconomy: 2,
            progressive: 2,
            nationalism: 1
          }
        }, {
          id: '4',
          name: "Society should give benefits and support people from different ethnic groups other than the primary to help them overcome discrimination from the primary group",
          optionWeight: {
            authoritarian: 3,
            controlledEconomy: 2,
            progressive: 3,
            nationalism: 0
          }
        }],
        selectedOption: {}
      }, {
        question: 'Should the needs of the nation come before the needs of the individual?',
        availableOptions: [{
          id: '1',
          name: 'Yes. The needs of the nation and society as a whole are more important than any one idividual and should always come before the individal',
          optionWeight: {
            authoritarian: 4,
            controlledEconomy: 2,
            progressive: 3,
            nationalism: 2
          }
        }, {
          id: '2',
          name: "In some special cases the needs of the nation come before and override the rights of the individual",
          optionWeight: {
            authoritarian: 3,
            controlledEconomy: 2,
            progressive: 2,
            nationalism: 2
          }
        }, {
          id: '3',
          name: "No. The rights of an individual are inviolable",
          optionWeight: {
            authoritarian: 1,
            controlledEconomy: 2,
            progressive: 2,
            nationalism: 2
          }
        }],
        selectedOption: {}
      }, {
        question: 'How do you feel about taxation?',
        availableOptions: [{
          id: '1',
          name: 'Taxes should be raised across the board',
          optionWeight: {
            authoritarian: 2,
            controlledEconomy: 4,
            progressive: 4,
            nationalism: 2
          }
        }, {
          id: '2',
          name: "Taxes should be raised on the rich",
          optionWeight: {
            authoritarian: 2,
            controlledEconomy: 3,
            progressive: 3,
            nationalism: 2
          }
        }, {
          id: '3',
          name: "Taxes should be lowered for everyone",
          optionWeight: {
            authoritarian: 2,
            controlledEconomy: 1,
            progressive: 2,
            nationalism: 2
          }
        }, {
          id: '4',
          name: "We should have a flat tax",
          optionWeight: {
            authoritarian: 2,
            controlledEconomy: 1,
            progressive: 1,
            nationalism: 2
          }
        }],
        selectedOption: {}
      }


    ];
    return arrQuestions;
  };

  // Returns the result to the chosen ideology.
  this.getSelfIdeologyData = function() {
    return objIdeologyQuestion;
  }

  // Drives the processing of the questions.
  this.processValues = function() {
    this.getTestValues();
    this.computeResult();
    this.saveUserResult();
    $blnFinished = true;
    return $blnFinished;
  };

  // Pushes the test results onto the arrResponse array.
  this.getTestValues = function() {
    arrResponses.push(objIdeologyQuestion.selectedOption);
    for (var i = 0; i < arrQuestions.length; i++) {
      arrResponses.push(arrQuestions[i].selectedOption);
    }
  };

  // Uses the arrResponses to compute the results and pushes the results onto objQuestionaireResult.
  this.computeResult = function() {
    var strChosenPoliticalIdeology = arrResponses[0].name;
    var dblControlledEconomy = dblControlledEconomy || 0;
    var dblAuthoritarian = dblAuthoritarian || 0;
    var dblProgressive = dblProgressive || 0;
    var dblNationalism = dblNationalism || 0;

    for (var i = 1; i < arrResponses.length; i++) {
      dblAuthoritarian += arrResponses[i].optionWeight.authoritarian;
      dblControlledEconomy += arrResponses[i].optionWeight.controlledEconomy;
      dblProgressive += arrResponses[i].optionWeight.progressive;
      dblNationalism += arrResponses[i].optionWeight.nationalism;
    }
    dblAuthoritarian = ((dblAuthoritarian / 4) / (arrResponses.length - 1)).toFixed(2);
    dblControlledEconomy = ((dblControlledEconomy / 4) / (arrResponses.length - 1)).toFixed(2);
    dblProgressive = ((dblProgressive / 4) / (arrResponses.length - 1)).toFixed(2);
    dblNationalism = ((dblNationalism / 4) / (arrResponses.length - 1)).toFixed(2);
    objQuestionaireResult = {
      "chosenIdeology": strChosenPoliticalIdeology,
      "authoritarian": dblAuthoritarian,
      "controlledEconomy": dblControlledEconomy,
      "progressive": dblProgressive,
      "nationalism": dblNationalism
    }
    this.clearData();

  };

  // Clears the arrResponse so it can be used on return users.
  this.clearData = function(){
    arrResponses = [];
    arrQuestions = [];

  }

  // Pushes the objQuestionaireResult to the backend.
  this.saveUserResult = function() {
    return $http.post(strBaseUrl + '/ideology', objQuestionaireResult).then(function(response) {
      return response;
    });
  };

  // Returns the objQuestionaireResult.
  this.returnTestValues = function() {
    return objQuestionaireResult;
  };

  // Returns the chart object that is used by Google Charts to construct the graph.
  this.getChartObject = function() {
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
          authoritarian: (dblAverageAuthoritarian / intArrayLength).toFixed(2),
          progressive: (dblAverageProgressive / intArrayLength).toFixed(2),
          nationalism: (dblAverageNationalism / intArrayLength).toFixed(2),
          controlledEconomy: (dblAverageControlledEconomy / intArrayLength).toFixed(2)
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
  };

}]);
