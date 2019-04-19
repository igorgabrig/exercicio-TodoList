var keyTodos = 'listTodo@minicursoJS'

var todos    = restoreFromStorage()

var $listElement   = document.querySelector('#app ul')
var $inputElement   = document.querySelector('#app input#nome')
var $EmailElement  = document.querySelector('#app input#email')
var $TelElement  = document.querySelector('#app input#tel')
var $buttonElement = document.querySelector('#app button')

function printList() {
    $listElement.innerHTML = ''
    var empty = true
    for (todo of todos) {
        empty = false
        var index = todos.indexOf(todo)
        console.log(todo)
        var item = `<li>${todo.nome} || ${todo.email}  || ${todo.tel}  <button onclick='deleteTodo(${index})'>Excluir</button></li>`;
        $listElement.insertAdjacentHTML('beforeend', item)
    }
    if(empty)
        $listElement.innerHTML = '<p>Não existem elementos na lista.</p>'
}

function addTodo() {
    var nomeText = $inputElement.value
    var emailText = $EmailElement.value
    var telText = $TelElement.value

    if(nomeText.length && emailText.length && telText.length){
        todos.push({
            'nome':nomeText,
            'email':emailText,
            'tel':telText,
          }
        )
        $inputElement.value = ''
        printList()
        saveToStorage()
    }
}

function deleteTodo(pos) {
    todos.splice(pos, 1)
    printList()
    saveToStorage()
}

function saveToStorage() {
    localStorage.setItem(keyTodos, JSON.stringify(todos));
}

function restoreFromStorage(){
    return JSON.parse(localStorage.getItem(keyTodos)) || [];
}

$buttonElement.addEventListener('click', function () {
    addTodo()
})

$inputElement.addEventListener('keypress', function(e){
    if(e.keyCode == 13)
        addTodo()
})

printList()
