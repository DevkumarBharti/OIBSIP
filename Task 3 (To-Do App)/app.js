let tasks = [];

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const task = {
            id: new Date().getTime(),
            text: taskText,
            completed: false,
            timestamp: new Date().toLocaleString()
        };

        tasks.push(task);
        updateLists();
        taskInput.value = '';
    }
}

function completeTask(taskId) {
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex !== -1) {
        tasks[taskIndex].completed = true;
        updateLists();
    }
}

function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    updateLists();
}

function updateLists() {
    const pendingTasksList = document.getElementById('pendingTasks');
    const completedTasksList = document.getElementById('completedTasks');

    pendingTasksList.innerHTML = '';
    completedTasksList.innerHTML = '';

    tasks.forEach(task => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${task.text} (${task.timestamp})</span>
            <button onclick="completeTask(${task.id})">Complete</button>
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;

        if (task.completed) {
            completedTasksList.appendChild(listItem);
        } else {
            pendingTasksList.appendChild(listItem);
        }
    });
}
