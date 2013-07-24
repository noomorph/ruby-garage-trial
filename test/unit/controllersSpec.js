/* global angular, beforeEach, inject, expect, describe, module, it */
(function () {
'use strict';

describe('TodoController tests', function() {
    var ctrl, scope;

    beforeEach(module('todoApp.controllers'));

    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();   
        ctrl = $controller('TodoCtrl', {$scope: scope});
    }));

    it("by default we have 2 lists", function () {
        expect(scope.lists).toBeDefined();
        expect(scope.lists.length).toBe(2);
    });

    it("each list has id, name and tasks", function () {
        angular.forEach(scope.lists, function (list) {
            expect(list instanceof TodoList).toBe(true);
            expect(list.id).toBeDefined();
            expect(list.name).toBeDefined();
            expect(list.tasks).toBeDefined();
        });
    });

    it("new list is empty", function () {
        var list = new TodoList();
        expect(list.id).toBeUndefined();
        expect(list.name).toBe('');
        expect(list.tasks.length).toBe(0);
    });

    it("add task with empty text does not work", function () {
        var list = new TodoList();
        list.add.do();
        expect(list.tasks.length).toBe(0);
    });

    it("after click on add task, new list is added and text is cleared", function () {
        var list = new TodoList();
        list.add.text = 'New task';
        list.add.do();
        expect(list.tasks.length).toBe(1);
        expect(list.tasks[0].text).toBe('New task');
        expect(list.add.text).toBe('');
    });

    it("after click on remove task, it is removed", function () {
        var list = new TodoList();
        list.tasks.push({ text: 'Sample task' });
        list.removeAt(0);
        expect(list.tasks.length).toBe(0);
    });

    it("should mark item as editable after button click", function () {
        var list = new TodoList();
        list.tasks.push({ text: 'Sample task'});
        list.edit(0);
        expect(list.tasks[0].editable).toBe(true);
    });

    it("should unmark editable item after edit is cancelled", function () {
        var list = new TodoList({ 
            tasks: [{ text: 'A task' }]
        });
        list.edit(0);
        list.cancelEdit();
        expect(list.tasks[0].editable).toBe(false);
    });

    it("should reset current editable item after you start editing the other", function () {
        var list = new TodoList({
            tasks: [
                { text: 'Task 1' },
                { text: 'Task 2' }
            ]
        });
        list.edit(0);
        list.edit(1);
        expect(list.tasks[0].editable).toBe(false);
        expect(list.tasks[1].editable).toBe(true);
    });
});

})();
