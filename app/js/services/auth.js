/*global $, FB, todoApp */

(function () {

'use strict';

todoApp.services.service('auth', ['$rootScope', function ($rootScope) {
        var me = this;

        this.watchLoginChange = _.bind(function() {
            var callback = _.bind(function(response) {
                if (response.status === 'connected') {
                    $rootScope.authResponse = response.authResponse;
                    me.getUserInfo(function () {
                        $("[data-ng-view]").show();
                        $("#login").modal('hide');
                    });
                } 
                else {
                    $("[data-ng-view]").show();
                    $("#login").modal({ keyboard: true });
                }
            }, this);
            FB.Event.subscribe('auth.authResponseChange', callback);
            FB.getLoginStatus(callback);
        }, this);

        this.getUserInfo = _.bind(function(callback) {
            FB.api('/me', function(response) {
                $rootScope.$apply(function() { 
                    $rootScope.user = me.user = response; 
                    $rootScope.$broadcast('authorized');
                    if (callback) { callback(); }
                });
            });
        }, this);

        this.logout = _.bind(function() {
            FB.logout(function(response) {
                $rootScope.$apply(function() { 
                    $rootScope.user = me.user = null;
                });	
            });
        }, this);

        return this;
    }]);

})();
