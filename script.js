// select element and assign them to variable

let newTask = document.querySelector('#new-task');
let form = document.querySelector('form');
let todoUl = document.querySelector('#items');
let completeUl = document.querySelector('.complete-list ul');

// functions

function createTask(task) {
    let listItem = document.createElement('li')
    let checkBox = document.createElement('input')
    let label = document.createElement('label')

    label.innerText = task;
    checkBox.type = 'checkBox';

    listItem.appendChild(checkBox)
    listItem.appendChild(label)

    return listItem;
}

function addTask(event) {
    event.preventDefault();
    let listItem = createTask(newTask.value);
    todoUl.appendChild(listItem);
    newTask.value = "";
    // bind the new list item in the complete list
    bindInCompleteItems(listItem, completeTask);
}

function completeTask() {
    let listItem = this.parentNode;
    let deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Delete';
    deleteBtn.className = 'delete';
    listItem.appendChild(deleteBtn);

    let checkBox = listItem.querySelector('input[type="checkbox"]');
    checkBox.remove();
    completeUl.appendChild(listItem)
    bindCompleteItems(listItem, deleteTask);
}

function deleteTask() {
    let listItem = this.parentNode;
    let ul = listItem.parentNode;
    ul.removeChild(listItem);
}

// this.parentNode can find its parent by the element, it's shortcut
function bindInCompleteItems(taskItem, checkBoxClick) {
    let checkBox = taskItem.querySelector('input[type="checkBox"]');
    checkBox.onchange = checkBoxClick;
}

function bindCompleteItems(taskItem, deleteButtonClick) {
    let deleteButton = taskItem.querySelector('.delete');
    deleteButton.onclick = deleteButtonClick;
}

// call functions

form.addEventListener('submit', addTask);

// hard coded task, make them work, use for loop
for (let i = 0; i < todoUl.children.length; i++) {
    bindInCompleteItems(todoUl.children[i], completeTask)
}

for (let i = 0; i < completeUl.children.length; i++) {
    bindCompleteItems(completeUl.children[i], deleteTask)
}