/*global $, FB, todoApp */

(function () {

'use strict';

todoApp.services.factory('auth', ['$rootScope', function ($rootScope) {
        var me = this;

        this.watchLoginChange = function() {
            var callback = function(response) {
                $("[data-ng-view]").show();
                if (response.status === 'connected') {
                    $rootScope.authResponse = response.authResponse;
                    me.getUserInfo(function () {
                        $("#login").modal('hide');
                    });
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
                $rootScope.$broadcast('authorized');
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
