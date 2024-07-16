const clickableTodo = document.querySelector('.clickable-todo');
const bottomTodo = document.querySelector('.bottom-todo');
const bottomform = document.querySelector('.bottom-todo-form');
const taskHeading = document.querySelector('.task-heading');

function saveTasksToLocalStorage() {
  const bottomTasks = document.querySelectorAll('.bottom-task');
  const tasks = [];

  bottomTasks.forEach(function (task) {
    const taskText = task.querySelector('label').textContent;
    const isCompleted = task.querySelector('input[type="checkbox"]').checked;
    tasks.push({ text: taskText, completed: isCompleted });
  });

  localStorage.setItem('bottom-tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
  const tasks = JSON.parse(localStorage.getItem('bottom-tasks'));

  if (tasks) {
    tasks.forEach(function (task) {
      var newTask = createTaskElement(task.text, task.completed);
      var bottomContainer = document.querySelector('.bottom-container');
      bottomContainer.appendChild(newTask);
    });

    taskHeading.classList.add('hidden');
  }
}

function createTaskElement(taskText, isCompleted) {
  var newTask = document.createElement('li');
  newTask.classList.add('bottom-task');

  var checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = 'checkbox-' + (document.querySelectorAll('.bottom-task').length + 1);
  checkbox.checked = isCompleted;

  var label = document.createElement('label');
  label.htmlFor = checkbox.id;
  label.textContent = taskText;

  var settingsDiv = document.createElement('div');
  settingsDiv.classList.add('bottom-settings');

  var settingsIcon = document.createElement('i');
  settingsIcon.classList.add('fas', 'fa-ellipsis-h');

  var taskMenu = document.createElement('ul');
  taskMenu.classList.add('bottom-task-menu', 'hidden');

  var editOption = document.createElement('li');
  editOption.textContent = 'Edit';

  var deleteOption = document.createElement('li');
  deleteOption.textContent = 'Delete';

  editOption.addEventListener('click', function () {
    var newText = prompt('Edit Todo:', taskText);
    if (newText !== null) {
      label.textContent = newText;
      taskText = newText;
      saveTasksToLocalStorage();
    }
  });

  deleteOption.addEventListener('click', function () {
    newTask.remove();
    saveTasksToLocalStorage();

    if (document.querySelectorAll('.bottom-task').length === 0) {
      taskHeading.classList.remove('hidden');
    }
  });

  settingsDiv.appendChild(settingsIcon);
  taskMenu.appendChild(editOption);
  taskMenu.appendChild(deleteOption);
  settingsDiv.appendChild(taskMenu);
  newTask.appendChild(checkbox);
  newTask.appendChild(label);
  newTask.appendChild(settingsDiv);

  settingsIcon.addEventListener('click', function () {
    var taskMenu = this.nextElementSibling;
    taskMenu.classList.toggle('hidden');
  });

  if (isCompleted) {
    newTask.classList.add('completed');
  }

  checkbox.addEventListener('change', function () {
    newTask.classList.toggle('completed');
    const isCompleted = this.checked;
    saveTasksToLocalStorage();
  });

  return newTask;
}

loadTasksFromLocalStorage();

bottomform.addEventListener('submit', function (event) {
  event.preventDefault();

  var inputBox = document.getElementById('input-box-bottom');
  var taskText = inputBox.value;

  var newTask = createTaskElement(taskText, false);
  var bottomContainer = document.querySelector('.bottom-container');
  bottomContainer.appendChild(newTask);

  inputBox.value = '';

  taskHeading.classList.add('hidden');

  saveTasksToLocalStorage();
});

clickableTodo.addEventListener('click', function () {
  bottomTodo.classList.toggle('hidden');
});