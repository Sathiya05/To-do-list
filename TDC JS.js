document.addEventListener('DOMContentLoaded', (event) => {
    const taskInput = document.getElementById('task-input');
    const dateTimeInput = document.getElementById('datetime-input');
    const addButton = document.getElementById('add-button');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    loadTasks();

    addButton.addEventListener('click', () => {
        const taskText = taskInput.value;
        const taskDateTime = dateTimeInput.value;

        if (taskText === '' || taskDateTime === '') {
            alert('Please enter both task and date-time.');
            return;
        }

        const taskItem = {
            text: taskText,
            dateTime: taskDateTime
        };

        addTaskToDOM(taskItem);
        saveTaskToLocalStorage(taskItem);

        taskInput.value = '';
        dateTimeInput.value = '';
    });

    function addTaskToDOM(task) {
        const li = document.createElement('li');
        li.textContent = `${task.text} - ${task.dateTime}`;
        taskList.appendChild(li);
    }

    function saveTaskToLocalStorage(task) {
        let tasks = localStorage.getItem('tasks');
        tasks = tasks ? JSON.parse(tasks) : [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        let tasks = localStorage.getItem('tasks');
        if (tasks) {
            tasks = JSON.parse(tasks);
            tasks.forEach(task => addTaskToDOM(task));
        }
    }
});

