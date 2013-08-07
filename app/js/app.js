/*global angular, FB, document*/

(function () {
//'use strict';

// Declare app level module which depends on filters, and services
angular.
  module('todoApp', ['todoApp.filters', 'todoApp.services', 'todoApp.directives', 'todoApp.controllers']).
  config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/todo', {templateUrl: 'partials/todo.html', controller: 'TodoController'});
      $routeProvider.otherwise({redirectTo: '/todo'});
  }]).
  run(['$rootScope', '$location', '$window', 'auth', function($rootScope, $location, $window, authService) {
    $rootScope.user = null;

    $window.fbAsyncInit = function() {
        FB.init({ // Executed when the SDK is loaded
            appId: '188996117830571', // Simple Todo Lists
            channelUrl: 'channel.html', // cross-browser fix
            status: true, // check user authentication status
            cookie: true, 
            xfbml: true 
        });
        authService.watchLoginChange();
    };

    (function(d){
        var js, 
        id = 'facebook-jssdk', 
        ref = d.getElementsByTagName('script')[0];

        if (d.getElementById(id)) {
            return;
        }

        js = d.createElement('script'); 
        js.id = id; 
        js.async = true;
        js.src = "//connect.facebook.net/en_US/all.js";

        ref.parentNode.insertBefore(js, ref);

    }(document));
}]);

})();
