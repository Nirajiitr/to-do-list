document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');
    const filterButtons = document.querySelectorAll('.filters button');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const renderTasks = (filter = 'all') => {
        taskList.innerHTML = '';
        let filteredTasks = tasks;

        if (filter === 'completed') {
            filteredTasks = tasks.filter(task => task.completed);
        } else if (filter === 'incomplete') {
            filteredTasks = tasks.filter(task => !task.completed);
        }

        filteredTasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = task.completed ? 'completed' : '';
            li.innerHTML = `
                <span>${task.description}</span>
                <div>
                    <button id="complete" onclick="toggleComplete(${index})">${task.completed ? 'Unmark' : 'Complete'}</button>
                    <button id="edit" onclick="editTask(${index})">Edit</button>
                    <button id="delete" onclick="deleteTask(${index})">Delete</button>
                </div>
            `;
            taskList.appendChild(li);
        });
    };

    window.addTask = (description) => {
        tasks.push({ description, completed: false });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    };

    window.toggleComplete = (index) => {
        tasks[index].completed = !tasks[index].completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    };

    window.editTask = (index) => {
        const newDescription = prompt('Edit task:', tasks[index].description);
        if (newDescription) {
            tasks[index].description = newDescription;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
        }
    };

    window.deleteTask = (index) => {
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    };

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newTask = document.getElementById('new-task').value.trim();
        if (newTask) {
            addTask(newTask);
            document.getElementById('new-task').value = '';
        }
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            renderTasks(button.id);
        });
    });

    renderTasks();
});
