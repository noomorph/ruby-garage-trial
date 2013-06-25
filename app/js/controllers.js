'use strict';

/* Controllers */

angular.module('todoApp.controllers', []).
  controller('TodoCtrl', ['$scope', function($scope) {
    $scope.projects = [
        {
            id: 1,
            name: 'Complete the test task for Ruby Garage',
            tasks: [
                { text: 'Open this mock-up in Adobe Fireworks', done: true },
                { text: 'Attentively check the file' },
                { text: 'Write HTML & CSS' },
                { text: 'Add JavaScript to implement adding / editing / removing for todo items and lists taking into account as more use cases as possible' }
            ]
        },
        {
            id: 2,
            name: 'For Home',
            tasks: [
                { text: 'Buy a milk' },
                { text: 'Call Mam' },
                { text: 'Clean the room' },
                { text: 'Repair the DVD Player' }
            ]
        }
    ];
  }])
  .controller('AboutCtrl', [function() {

  }]);