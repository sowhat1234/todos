'use strict'

function onInit() {
    renderTodos()
}

function onRemoveTodo(ev, todoId) {
    ev.stopPropagation()
    console.log('Removing Todo', todoId);
    //confirm to remove 
    // if (confirm('are you sure?')) {
    //     onRemoveTodo
    // } else return
    removeTodo(todoId)
    renderTodos()
}

function renderTodos() {
    const todos = getTodosForDisplay()
    var strHTMLs = todos.map(todo =>
        `<li class="${(todo.isDone) ? 'done' : ''}" onclick="onToggleTodo('${todo.id}')">
           ${todo.txt}
            <button onclick="onRemoveTodo(event, '${todo.id}')"
            >x</button> createdAt - ${todo.createdAt} importance ${todo.importance}
        </li>`)

    document.querySelector('.todo-list').innerHTML = strHTMLs.join('')

    document.querySelector('.todos-total-count').innerText = getTodosCount()
    document.querySelector('.todos-active-count').innerText = getActiveTodosCount()
}


function onToggleTodo(todoId) {
    console.log('Toggling', todoId);
    toggleTodo(todoId)

    renderTodos()
}


function onAddTodo() {
    const elTxt = document.querySelector('input[name=todoTxt]');
    const elImportance = document.querySelector('input[name=todoNum]');
    const importance = +elImportance.value;

    const txt = elTxt.value;
    if (txt === '') return;
    addTodo(txt, importance)
    elTxt.value = '';
    elImportance.value = '';
    renderTodos();
}

function onSetFilter(filterBy) {
    console.log('Filtering By:', filterBy);

    setFilter(filterBy)
    renderTodos()

}

function onSetSort(filterBy) {
    console.log('Filtering By:', filterBy);

    setSort(filterBy)
    renderTodos()

}