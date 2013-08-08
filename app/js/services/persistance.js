/*global TodoList, localStorage */

(function () {

todoApp.StubStorage = function () {
    this.data = [
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

    this.get = _.bind(function (onload) {
        if (onload) onload(this.data);
    }, this);

    this.set = _.bind(function (data) {
        if (this.onset) { this.onset(data); }
    }, this);

    return this;
};

todoApp.LocalStorage = function () {
    this.get = function (onload) {
        if (!onload) { return; }

        if (typeof(Storage) !== "undefined") 
            return onload(JSON.parse(localStorage.lists || '[]'));

        return onload([]);
    };

    this.set = function (lists) {
        if (typeof(Storage) !== "undefined") {
            localStorage.lists = JSON.stringify(lists);
        }
    };

    return this;
};

todoApp.ServerStorage = function ($http, $rootScope, signature, onerror) {
    if (!signature) {
        throw new Error("todoApp.ServerStorage: no signature supplied");
    }

    this.onerror = onerror || function () {};

    this.get = _.bind(function (onload) {
        var promise = $http.get('/lists', { 
            params: signature
        }).error(this.onerror);

        if (onload) { promise.success(onload); }
    }, this);

    this.set = _.bind(function (data, onsave) {
        if (!data) { throw new Error ("no data to save"); }

        var promise = $http.put('/lists', data, {
            params: this.signature
        }).error(this.onerror);

        if (onsave) { promise.success(onsave); }
    }, this);

    return this;
};

var StubStorage = todoApp.StubStorage,
    LocalStorage = todoApp.LocalStorage,
    ServerStorage = todoApp.ServerStorage;

todoApp.services.factory('persistance', ['$http', '$rootScope', function ($http, $rootScope) {
    this.storage = new StubStorage();

    this.onerror = function (data, status, headers, config) {
        $rootScope.$broadcast('error', data, status);
    };

    this.changeStorage = function (storage) {
        this.storage = storage;
        $rootScope.$broadcast('storagechanged', this);
    };

    $rootScope.$on('authorized', _.bind(function () {
        var auth = $rootScope.authResponse;
        var user = $rootScope.user;

        this.signature = {
            accessToken: auth.accessToken,
            expiresIn: auth.expiresIn,
            signedRequest: auth.signedRequest,
            userID: auth.userID
        };

        this.changeStorage(new ServerStorage($http, $rootScope, this.signature, this.onerror));
    }, this));

    this.get = this.storage.get;
    this.set = this.storage.set;


    return this;
}]);

})();

