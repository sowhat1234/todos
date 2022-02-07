'use strict'

const STORAGE_KEY = 'todosDB';
var gTodos;

var gFilterBy = 'ALL';
var gSortBy = '';
_createTodos();




function getTodosForDisplay() {

    if (gSortBy === 'TEXT') {
        gTodos.sort(sortByText);
    } else if (gSortBy === 'IMPORTANCE') {
        gTodos.sort(sortByImportance);

    } else if (gSortBy === 'CREATED') {
        gTodos.sort(sortByCreatedAt);
    }
    if (gFilterBy === 'ALL') return gTodos


    return gTodos.filter(todo =>
        todo.isDone && gFilterBy === 'DONE' ||
        !todo.isDone && gFilterBy === 'ACTIVE'
    )
}

function sortByImportance(a, b) {
    return a.createdAt - b.createdAt;
};

function sortByCreatedAt(a, b) {
    return a.importance - b.importance;
};

function sortByText(a, b) {
    var nameA = a.txt.toUpperCase(); // ignore upper and lowercase
    var nameB = b.txt.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
        return -1;
    }
    return 1;
}

function removeTodo(todoId) {
    const idx = gTodos.findIndex(todo => todo.id === todoId)
    gTodos.splice(idx, 1)
    _saveTodosToStorage()
}

function toggleTodo(todoId) {
    var todo = gTodos.find(todo => todo.id === todoId)
    todo.isDone = !todo.isDone
    _saveTodosToStorage()
}

function addTodo(txt, importance) {
    const todo = _createTodo(txt, importance)
    gTodos.unshift(todo)
    _saveTodosToStorage()
}


function getTodosCount() {
    return gTodos.length
}

function getActiveTodosCount() {
    const activeTodos = gTodos.filter(todo => !todo.isDone)
    return activeTodos.length
}

function setFilter(filterBy) {
    gFilterBy = filterBy;
}

function setSort(filterBy) {
    gSortBy = filterBy;
}

function _createTodos() {
    gTodos = loadFromStorage(STORAGE_KEY)
    if (!gTodos || !gTodos.length) {
        gTodos = [
            _createTodo('Learn HTML'),
            _createTodo('Study CSS'),
            _createTodo('Master Javascript'),
        ]
        _saveTodosToStorage()
    }
}

function _createTodo(txt, importance = 1) {
    const todo = {
        id: _makeId(),
        txt: txt,
        isDone: false,
        createdAt: getTime(),
        importance: importance
    }
    return todo
}

function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function _saveTodosToStorage() {
    saveToStorage(STORAGE_KEY, gTodos)
}



function getTime() {
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return time
}