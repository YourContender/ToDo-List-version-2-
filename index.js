const enterInput = document.getElementById('input');
const clickButton = document.getElementById('button');
const displayResult = document.getElementById('result');

clickButton.addEventListener('click', createAddTask);

// create tag <li>...</li>
function createLiElements(task) {
    const listItems = document.createElement('li');
    listItems.className = 'result__item';

    const title = document.createElement('h4');
    title.className = 'h4__title';
    title.innerHTML = task;

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'input__edit';

    const editButton = document.createElement('button');
    editButton.className = 'btn__edit';
    editButton.innerText = 'Edit';

    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn__delete';
    deleteButton.innerText = 'Delete';

    listItems.appendChild(title);
    listItems.appendChild(editButton);
    listItems.appendChild(deleteButton);
    
    deleteButton.addEventListener('click', (e) => {
        removeTask(listItems);
    });
    
    editButton.addEventListener('click', (e) => {
        listItems.appendChild(input);
        editTask(listItems);
    });

    title.addEventListener('click', (e) => {
        listItems.classList.toggle('result__item__link')
    })

    return listItems;
}

// add task to document
function createAddTask() {
    if (enterInput) {
        const enterText = enterInput.value;
        // console.log(enterText);
        if (enterText != '') {
            let listItems = createLiElements(enterText);
            displayResult.appendChild(listItems);
            enterInput.value = '';
        }
    }
    saveStorage();
}

// remove task
function removeTask(listItems) {
    displayResult.removeChild(listItems);
    saveStorage();
}

// edit current task
function editTask(listItems) {
    let edit = listItems.querySelector('button.btn__edit');
    let listItem = edit.parentNode;
    let input = listItem.querySelector('input');
    let text = listItem.querySelector('h4.h4__title');

    input.value != '' ? text.innerText = input.value : null
    input.value = '';

    saveStorage();
}

// save task in LocalStorage
function saveStorage() {
    const taskList = [];

    for (let i = 0; i < displayResult.children.length; i++) {
        taskList.push(displayResult.children[i].getElementsByTagName('h4')[0].innerText)
    }
    localStorage.removeItem('todo');
    localStorage.setItem('todo', JSON.stringify({'task': taskList}));
}

function loadStorage() {
    return JSON.parse(localStorage.getItem('todo'));
}

let data = loadStorage();

for (let i = 0; i < data.task.length; i++) {
    let listItem = createLiElements(data.task[i]);
    displayResult.appendChild(listItem);
}
