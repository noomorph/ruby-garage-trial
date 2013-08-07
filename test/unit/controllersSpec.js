/* global angular, beforeEach, inject, expect, describe, module, it */
(function () {
'use strict';

describe('TodoController List tests\n', function() {
    var ctrl, scope;

    beforeEach(module('todoApp.controllers'));

    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();   
        ctrl = $controller('TodoController', {$scope: scope});
    }));

    it("new list is empty", function () {
        var list = new TodoList();

        expect(list.id).toBeUndefined();
        expect(list.name).toBe('');
        expect(list.tasks.length).toBe(0);
        expect(list.phantom).toBe(false);
        expect(list.editable).toBe(false);
    });

    it("has 2 lists by default", function () {
        expect(scope.lists).toBeDefined();
        expect(scope.lists.length).toBe(2);
    });

    it("has loaded lists with defined fields", function () {
        angular.forEach(scope.lists, function (list) {
            expect(list instanceof TodoList).toBe(true);
            expect(list.id).toBeDefined();
            expect(list.name).toBeDefined();
            expect(list.tasks).toBeDefined();
            expect(list.editable).toBe(false);
            expect(list.phantom).toBe(false);
        });
    });

    it("appends a list to scope after adding", function () {
        var count = scope.lists.length;

        scope.addTodoList();

        var list = scope.lists[count];
        expect(list.id).toBeUndefined();
        expect(list.name).toBe('');
        expect(list.tasks.length).toBe(0);
        expect(list.phantom).toBe(true);
        expect(list.editable).toBe(true);
    });

    it("removes phantom list if no name is given", function () {
        var count = scope.lists.length;

        scope.addTodoList();
        var list = scope.lists[count];
        list.cancelRename();

        expect(scope.lists).not.toContain(list);
    });

    it("makes list not phantom if confirmed", function () {
        var count = scope.lists.length;

        scope.addTodoList();
        var list = scope.lists[count];
        list.name = 'My list';
        expect(list.confirmRename()).toBe(undefined);

        expect(list.phantom).toBe(false);
        expect(list.editable).toBe(false);
        expect(list.name).toBe('My list');
        expect(scope.lists).toContain(list);
    });

    it("makes list editable while renaming", function () {
        var list = scope.lists[0];

        list.rename();

        expect(list.editable).toBe(true);
    });

    it("remembers list name on start of renaming", function () {
        var list = scope.lists[0];

        list.rename();

        expect(list.lastName).toBe(list.name);
    });

    it("reverts its name after cancel rename of existing list", function () {
        var list = scope.lists[0];
        var previousName = list.name;

        list.rename();
        list.name = 'Some name';
        list.cancelRename();

        expect(list.editable).toBe(false);
        expect(list.name).toBe(previousName);
        expect(list.lastName).toBeUndefined();
    });

    it("after rename confirmation list's name changes if it is not empty", function () {
        var list = scope.lists[0];
        var nextName = 'Something 2';

        list.rename();
        list.name = nextName;
        list.confirmRename();

        expect(list.editable).toBe(false);
        expect(list.name).toBe(nextName);
        expect(list.lastName).toBeUndefined();
    });

    it("if rename input of confirmation list is empty then it cannot be saved", function () {
        var list = scope.lists[0];

        list.rename();
        list.name = '';

        expect(list.confirmRename()).toBe(false);
        expect(list.name).toBe('');
        expect(list.lastName).toBeDefined();
    });

    it("removes a list at index", function () {
        var count = scope.lists.length;
        var list = scope.lists[0];

        scope.removeList(0);
        expect(scope.lists.length).toBe(count - 1);
        expect(scope.lists).not.toContain(list);
    });

});

describe('TodoController Task tests\n', function() {
    var ctrl, scope;

    beforeEach(module('todoApp.controllers'));

    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();   
        ctrl = $controller('TodoController', {$scope: scope});
    }));

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
        expect(list.tasks[0].done).toBe(false);
        expect(list.tasks[0].editable).toBe(false);
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

    it("should not confirm editable item if its its text is empty", function () {
        var list = createListWithTasks(1);
        var task = list.tasks[0];

        list.edit(0);
        task.text = '';

        expect(list.confirmEdit(0)).toBe(false);
        expect(task.editable).toBe(true);
        expect(task.lastValue).toBeDefined();
        expect(task.text).toBe('');
    });

    it("should reset current editable item after you start editing the other", function () {
        var list = createListWithTasks(2);

        list.edit(0);
        list.edit(1);

        expect(list.tasks[0].editable).toBe(false);
        expect(list.tasks[1].editable).toBe(true);
    });

    it("should toggle done flag of task", function () {
        var item = new TodoItem();
        expect(item.done).toBe(false);
        item.toggleDone();
        expect(item.done).toBe(true);
        item.toggleDone();
        expect(item.done).toBe(false);
    });

    it("should not toggle done flag of task if target is INPUT", function () {
        var item = new TodoItem();
        item.toggleDone({ target: { tagName: 'INPUT' }});
        expect(item.done).toBe(false);

        item.done = true;
        item.toggleDone({ target: { tagName: 'INPUT' }});
        expect(item.done).toBe(true);
    });
});

})();
