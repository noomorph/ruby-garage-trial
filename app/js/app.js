'use strict';


// Declare app level module which depends on filters, and services
angular.module('todoApp', ['todoApp.filters', 'todoApp.services', 'todoApp.directives', 'todoApp.controllers']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/todo', {templateUrl: 'partials/todo.html', controller: 'Todo'});
    $routeProvider.when('/about', {templateUrl: 'partials/about.html', controller: 'About'});
    $routeProvider.otherwise({redirectTo: '/todo'});
  }]);
