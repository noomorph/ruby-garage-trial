/* global angular */

function TodoList (config) {
    var me = this;
    config = config || {};
    this.id = config.id;
    this.name = config.name || '';
    this.tasks = config.tasks || [];

    this.add = { 
        text: '',
        do: function () {
            var text = me.add.text;
            if (text) {
                me.tasks.unshift({ text: text });
                me.add.text = '';
            }
        }
    };

    this.removeAt = function (index) {
        if (index >= 0 && index < me.tasks.length) {
            me.tasks.splice(index, 1);
            return true;
        }
        return false;
    };
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
