/* Directives */
(function () {
//'use strict';

angular.module('todoApp.directives', ['ui.sortable']).
    directive('appVersion', ['version', function(version) {
        return function(scope, elm, attrs) {
            elm.text(version);
        };
    }]).
    directive('ngFocus', ['$parse', function($parse) {
      return function(scope, element, attr) {
        var fn = $parse(attr.ngFocus);
        element.bind('focus', function(event) {
          scope.$apply(function() {
            fn(scope, {$event:event});
          });
        });
      };
    }]).
    directive('ngBlur', ['$parse', function($parse) {
      return function(scope, element, attr) {
        var fn = $parse(attr.ngBlur);
        element.bind('blur', function(event) {
          scope.$apply(function() {
            fn(scope, {$event:event});
          });
        });
      };
    }]).
    directive('ngEnter', function() {
        return function(scope, element, attrs) {
            element.bind("keydown keypress", function(event) {
                if(event.which === 13) {
                    scope.$apply(function(){
                        scope.$eval(attrs.ngEnter);
                    });
                    event.preventDefault();
                }
            });
        };
    }).
    directive('ngEscape', function() {
        return function(scope, element, attrs) {
            element.bind("keydown keypress", function(event) {
                if(event.which === 27) {
                    scope.$apply(function(){
                        scope.$eval(attrs.ngEscape);
                    });
                    event.preventDefault();
                }
            });
        };
    }).
    directive('ngGithub', function() {
        return {
            retrict: "E",
            replace: true,
            transclude: true,
            template: '<a href="https://github.com/noomorph/ruby-garage-trial"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://s3.amazonaws.com/github/ribbons/forkme_right_red_aa0000.png" alt="Fork me on GitHub"></a>'
        };
    });
})();
