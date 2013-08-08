function TodoItem (config, $scope) {
    _.extend(this, config);
    _.defaults(this, {
        text: '',
        editable: false,
        done: false
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

       $scope.$emit('datachanged');
    }, this);

    this.edit = _.bind(function (index) {
       setTimeout(function () {// TODO: move to service
           $(".editable input").focus();
       }, 50);
       this.editable = true;
       this.lastValue = this.text;
    }, this);

    this.toggleDone = function (e) {
        if (!(e && e.target && e.target.tagName.toLowerCase() === 'input')) {
            this.done = !this.done;
        }
        $scope.$emit('datachanged');
        return;
    };
}

function TodoList (config, $scope) {
    _.extend(this, config);
    _.defaults(this, {
        name: '',
        tasks: [],
        editable: false,
        phantom: false
    });

    this.tasks = _.map(this.tasks, function (config) {
        return new TodoItem(config, $scope);
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
        var result = this.tasks[index].confirmEdit();
        if (result !== false) { $scope.$emit('datachanged'); }
        return result;
    }, this);

    this.edit = _.bind(function (index) {
        this.cancelEdit();
        this.tasks[index].edit();
    }, this); 

    this.removeAt = _.bind(function (index) {
        if (index >= 0 && index < this.tasks.length) {
            this.tasks.splice(index, 1);
            $scope.$emit('datachanged');
        }
    }, this);

    this.rename = _.bind(function () {
        setTimeout(function () {// TODO: move to service
            $(".editable input").focus();
        }, 50);
        this.editable = true;
        this.lastName = this.name;
    }, this);

    this.confirmRename = _.bind(function () {
        if (!this.name) {
            return false;
        }
        this.phantom = false;
        this.editable = false;
        this.lastName = undefined;

        $scope.$emit('datachanged');
    }, this);

    this.cancelRename = _.bind(function () {
        if (this.phantom) {
            $scope.removeList(this);
            return;
        }

        this.editable = false;
        if (this.lastName) {
            this.name = this.lastName;
        }
        this.lastName = undefined;
    }, this);
}

todoApp.controllers.controller('TodoController', ['$scope', 'persistance', function ($scope, persistance) {
    
    $scope.addTodoList = function () {
        $scope.lists.push(new TodoList({editable: true, phantom: true}, $scope));
        
        $("html, body").animate({ scrollTop: $(document).height() }, 1000); // TODO: move to service
    };

    $scope.removeList = function (index) {
        if (typeof index === 'object') {
            index = $scope.lists.indexOf(index);
        }
        if (index >= 0 && index < $scope.lists.length) {
            $scope.lists.splice(index, 1);
        }
        $scope.$emit('datachanged');
    };

    $scope.sortableOptions = {
        handle: ".drag-small",
        axis: "y"
    };

    $scope.load = function (ename, newPersHack) {
        persistance.get(function (lists) {
            $scope.lists = _.map(lists, function (list) {
                return new TodoList(list, $scope);
            });
        });
    };

    $scope.persist = function () {
        persistance.set($scope.lists);
    };

    $scope.load();

    $scope.$on('storagechanged', $scope.load);
    $scope.$on('datachanged', $scope.persist);
}]);

