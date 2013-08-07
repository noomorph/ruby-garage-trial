/*global angular, FB*/

(function () {
'use strict';

    angular.
    module('todoApp.services', []).
    value('version', '0.1').
    factory('auth', ['$rootScope', function ($rootScope) {
        var me = this;

        this.watchLoginChange = function() {
            var callback = function(response) {
                $("[data-ng-view]").show();
                if (response.status === 'connected') {
                    me.getUserInfo(function () { });
                } 
                else {
                    $("#login").modal();
                }
            };
            FB.Event.subscribe('auth.authResponseChange', callback);
            FB.getLoginStatus(callback);
        };

        this.getUserInfo = function(callback) {
            FB.api('/me', function(response) {
                $rootScope.$apply(function() { 
                    $rootScope.user = me.user = response; 
                });
                if (callback) { callback(); }
            });
        };

        this.logout = function() {
            FB.logout(function(response) {
                $rootScope.$apply(function() { 
                    $rootScope.user = me.user = null;
                });	
            });
        };

        return this;
    }]);

})();
