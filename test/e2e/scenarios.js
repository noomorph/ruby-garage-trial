// 'use strict';

describe('todo app', function() {
    beforeEach(function() {
        browser().navigateTo('../../app');
    });
    it('should automatically redirect to /todo when location hash/fragment is empty', function() {
        expect(browser().location().url()).toBe("/todo");
    });
    describe('todo', function() {
        beforeEach(function() {
            browser().navigateTo('#/todo');
        });
        it('should render todo when user navigates to /todo', function() {
            expect(element('[ng-view] .todo-widget').count()).toBe(2);
            expect(element('[ng-view] .todo-add-list').count()).toBe(1);
        });
        it('should disable add task button', function() {
            expect(element('[ng-view] .todo-widget-add input').attr('placeholder'))
                .toBe('Start typing here to create a task');
            expect(element('[ng-view] .todo-widget-add button').attr('disabled'))
                .toBe('disabled');
        });
        it('should enable add task button when text is not empty', function() {
            var input = element('[ng-view] .todo-widget-add input');
            var button = element('[ng-view] .todo-widget-add button');
            input.val('New task');
            // expect(button.attr('disabled')).toBe('disabled');
        });
        it('should make task title editable after click on pencil', function() {
            var header = element('h2+form .todo-widget-header .title');
            var pencil = element('h2+form .todo-widget-header .icon.pencil');
            pencil.click();
            expect(header.count()).toBe(1);
        });
        it('should delete task after click on delete button', function() {
            var items = element('h2+form tbody tr');
            expect(items.count()).toBe(4);
            element('h2+form tbody tr:first-child .trash-small').click();
            debugger;
            expect(items.count()).toBe(3);
        });
    });
});
