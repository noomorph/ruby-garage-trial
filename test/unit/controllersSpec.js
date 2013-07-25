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

    it("after click on Add List we have one list more", function () {
        var count = scope.lists.length;

        scope.addTodoList();

        expect(scope.lists.length).toBe(count + 1);
        var list = scope.lists[count];
        var empty = new TodoList(); 
        expect(list.id).toBe(empty.id);
        expect(list.name).toBe(empty.name);
        expect(list.tasks.length).toBe(empty.tasks.length);
    });

    it("after click on remove list we have one list less", function () {
        var count = scope.lists.length;
        var list = scope.lists[0];

        scope.removeList(0);
        expect(scope.lists.length).toBe(count - 1);
        expect(scope.lists).not.toContain(list);
    });

    it("new list is empty", function () {
        var list = new TodoList();

        expect(list.id).toBeUndefined();
        expect(list.name).toBe('New list');
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

    var createListWithTasks = function (count) {
        var i, tasks = [];
        for (i = 0; i < count; i++) {
            tasks.push({ text: 'Task ' + i });
        }
        return new TodoList({ tasks: tasks });
    };

    it("after click on remove task, it is removed", function () {
        var list = createListWithTasks(1);

        list.removeAt(0);

        expect(list.tasks.length).toBe(0);
    });

    it("should mark item as editable after button click", function () {
        var list = createListWithTasks(1);
        var task = list.tasks[0];

        list.edit(0);

        expect(task.editable).toBe(true);
        expect(task.lastValue).toBe(task.text);
    });

    it("should unmark editable item and revert text after edit is cancelled", function () {
        var list = createListWithTasks(1);
        var task = list.tasks[0];
        var text = task.text;

        list.edit(0);
        task.text = 'Another text';
        list.cancelEdit();

        expect(task.editable).toBe(false);
        expect(task.lastValue).toBeUndefined();
        expect(task.text).toBe(text);
    });

    it("should unmark editable item and apply text after edit is confirmed", function () {
        var list = createListWithTasks(1);
        var task = list.tasks[0];

        list.edit(0);
        task.text = 'Another text';
        list.confirmEdit(0);

        expect(task.editable).toBe(false);
        expect(task.lastValue).toBeUndefined();
        expect(task.text).toBe('Another text');
    });

    it("should reset current editable item after you start editing the other", function () {
        var list = createListWithTasks(2);

        list.edit(0);
        list.edit(1);

        expect(list.tasks[0].editable).toBe(false);
        expect(list.tasks[1].editable).toBe(true);
    });
});

})();