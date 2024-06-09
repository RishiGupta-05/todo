let lists = {};
let currentList = null;

function showCreateList() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <input type="text" id="listName" placeholder="Enter list name">
        <button onclick="createList()">Create List</button>
    `;
}

function createList() {
    const listName = document.getElementById('listName').value;
    if (listName && !lists[listName]) {
        lists[listName] = [];
        alert(`List '${listName}' created!`);
        document.getElementById('content').innerHTML = '';
    } else {
        alert('List name is empty or already exists.');
    }
}

function showRemoveList() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <select id="listToRemove">
            ${Object.keys(lists).map(list => `<option value="${list}">${list}</option>`).join('')}
        </select>
        <button onclick="removeList()">Remove List</button>
    `;
}

function removeList() {
    const listToRemove = document.getElementById('listToRemove').value;
    if (listToRemove) {
        delete lists[listToRemove];
        alert(`List '${listToRemove}' removed!`);
        document.getElementById('content').innerHTML = '';
    }
}

function showUseList() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <select id="listToUse" onchange="useList(this.value)">
            <option value="">Select a list</option>
            ${Object.keys(lists).map(list => `<option value="${list}">${list}</option>`).join('')}
        </select>
        <div id="listContent"></div>
    `;
}

function useList(listName) {
    currentList = listName;
    const listContent = document.getElementById('listContent');
    listContent.innerHTML = `
        <h3>${listName}</h3>
        <input type="text" id="taskName" placeholder="Enter task">
        <button onclick="addTask()">Add Task</button>
        <ul id="taskList">
            ${lists[listName].map((task, index) => `
                <li class="task">
                    <span>${task.name}</span>
                    <button onclick="markTaskCompleted(${index})">${task.completed ? 'Unmark' : 'Complete'}</button>
                    <button onclick="removeTask(${index})">Remove</button>
                </li>
            `).join('')}
        </ul>
    `;
}

function addTask() {
    const taskName = document.getElementById('taskName').value;
    if (taskName && currentList) {
        lists[currentList].push({ name: taskName, completed: false });
        useList(currentList);
    }
}

function markTaskCompleted(index) {
    if (currentList) {
        lists[currentList][index].completed = !lists[currentList][index].completed;
        useList(currentList);
    }
}

function removeTask(index) {
    if (currentList) {
        lists[currentList].splice(index, 1);
        useList(currentList);
    }
}
