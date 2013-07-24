/* global angular */

function TodoItem (config) {
    _.extend(this, config);
    _.defaults(this, {
        text: '',
        editable: false
    });
}

function TodoList (config) {
    _.extend(this, config);
    _.defaults(this, {
        name: '',
        tasks: []
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
            task.editable = false;
        });
    }, this);

    this.edit = _.bind(function (index) {
        this.cancelEdit();
        var task = this.tasks[index];
        if (task) {
            task.editable = true;
        }
    }, this);

    this.removeAt = _.bind(function (index) {
        if (index >= 0 && index < this.tasks.length) {
            this.tasks.splice(index, 1);
            return true;
        }
        return false;
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
    }]);
    todoApp.controllers.controller('AboutCtrl', [function() {
    }]);
})();
