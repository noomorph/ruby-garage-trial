/* global angular */

function TodoItem (config) {
    _.extend(this, config);
    _.defaults(this, {
        text: '',
        editable: false
    });

    this.cancelEdit = _.bind(function () {
        this.editable = false;
        if (this.lastValue) {
            this.text = this.lastValue;
            this.lastValue = undefined;
        }
    }, this);

    this.confirmEdit = _.bind(function () {
       if (!this.text) {
           return false;
       }
       this.editable = false;
       this.lastValue = undefined;
    }, this);

    this.edit = _.bind(function (index) {
       this.editable = true;
       this.lastValue = this.text;
    }, this);
}

function TodoList (config) {
    _.extend(this, config);
    _.defaults(this, {
        name: 'New list',
        tasks: [],
        editable: false
    });

    this.tasks = _.map(this.tasks, function (config) {
        return new TodoItem(config);
    });

    this.add = { 
        text: '',
        do: _.bind(function () {
            var text = this.add.text;
            if (text) {
                this.tasks.unshift(new TodoItem({ text: text }));
                this.add.text = '';
            }
        }, this)
    };

    this.cancelEdit = _.bind(function () {
        _.each(this.tasks, function (task) {
            task.cancelEdit();
        });
    }, this);

    this.confirmEdit = _.bind(function (index) {
        return this.tasks[index].confirmEdit();
    }, this);

    this.edit = _.bind(function (index) {
        this.cancelEdit();
        this.tasks[index].edit();
    }, this);

    this.removeAt = _.bind(function (index) {
        if (index >= 0 && index < this.tasks.length) {
            this.tasks.splice(index, 1);
        }
    }, this);

    this.rename = _.bind(function () {
        this.editable = true;
        this.lastName = this.name;
    }, this);

    this.confirmRename = _.bind(function () {
        if (!this.name) {
            return false;
        }
        this.editable = false;
        this.lastName = undefined;
    }, this);

    this.cancelRename = _.bind(function () {
        this.editable = false;
        if (!this.name && this.lastName) {
            this.name = this.lastName;
        }
        this.lastName = undefined;
    }, this);
}

(function () {
    'use strict';

    var todoApp = { controllers: angular.module('todoApp.controllers', []) };
    todoApp.controllers.controller('TodoCtrl', ['$scope', function($scope) {
        $scope.lists = [
            new TodoList({
                id: 1,
                name: 'Complete the test task for Ruby Garage',
                tasks: [
                    { text: 'Open this mock-up in Adobe Fireworks', done: true },
                    { text: 'Attentively check the file' },
                    { text: 'Write HTML & CSS' },
                    { text: 'Add JavaScript to implement adding / editing / removing for todo items and lists taking into account as more use cases as possible' }
                ]
            }),
            new TodoList({
                id: 2,
                name: 'For Home',
                tasks: [
                    { text: 'Buy a milk' },
                    { text: 'Call Mam' },
                    { text: 'Clean the room' },
                    { text: 'Repair the DVD Player' }
                ]
            })
        ];
        $scope.addTodoList = function () {
            $scope.lists.push(new TodoList({editable: true}));
        };
        $scope.removeList = function (index) {
            if (index >= 0 && index < $scope.lists.length) {
                $scope.lists.splice(index, 1);
            }
        };
        $scope.sortableOptions = {
            handle: ".drag-small",
            axis: "y"
        };
    }]);
    todoApp.controllers.controller('AboutCtrl', [function() {
    }]);
})();
