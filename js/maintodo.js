const form = document.querySelector('.main-focus');
const focusContainer = document.querySelector('.focus-container');
const today = document.getElementById('today');
const inputBox = document.getElementById('input-box');

const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
const todayVisibility = localStorage.getItem('todayVisibility') || 'none';

if (savedTasks.length > 0) {
  today.style.display = 'block';
  inputBox.style.display = 'none';
} else {
  today.style.display = 'none';
}

savedTasks.forEach(task => {
  const newTask = createTaskElement(task.text, task.checked);
  focusContainer.appendChild(newTask);
});

function addNewElement(elementText) {
  const newElement = createTaskElement(elementText, false);
  focusContainer.appendChild(newElement);

  savedTasks.push({ text: elementText, checked: false });
  localStorage.setItem('tasks', JSON.stringify(savedTasks));

  inputBox.style.display = 'none';

  if (inputBox.value === '') {
    inputBox.style.display = 'none';
  }

  if (savedTasks.length > 0) {
    inputBox.style.display = 'none';
  }

  today.style.display = 'block';
  localStorage.setItem('todayVisibility', 'block');
}

function createTaskElement(taskText, isChecked = false) {
  var newTask = document.createElement('li');
  newTask.classList.add('task');

  var checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = 'checkbox-' + (document.querySelectorAll('.task').length + 1);

  var label = document.createElement('label');
  label.htmlFor = checkbox.id;
  label.textContent = taskText;

  var settingsDiv = document.createElement('div');
  settingsDiv.classList.add('settings');

  var settingsIcon = document.createElement('i');
  settingsIcon.classList.add('fas', 'fa-ellipsis-h');

  var taskMenu = document.createElement('ul');
  taskMenu.classList.add('task-menu', 'hidden');

  var addNewTasks = document.createElement('li');
  addNewTasks.textContent = 'Add New Tasks';
  addNewTasks.addEventListener('click', hideTaskMenu);

  var editOption = document.createElement('li');
  editOption.textContent = 'Edit';
  editOption.addEventListener('click', hideTaskMenu);

  var deleteOption = document.createElement('li');
  deleteOption.textContent = 'Delete';

  function hideTaskMenu() {
    taskMenu.classList.toggle('hidden');
  }

  editOption.addEventListener('click', function () {
    var newText = prompt('Enter new text for the task:', taskText);
    if (newText !== null) {
      label.textContent = newText;

      const index = savedTasks.findIndex(task => task.text === taskText);
      if (index !== -1) {
        savedTasks[index].text = newText;
        localStorage.setItem('tasks', JSON.stringify(savedTasks));
      }
    }
  });

  deleteOption.addEventListener('click', function () {
    newTask.remove();

    const index = savedTasks.findIndex(task => task.text === taskText);
    if (index !== -1) {
      savedTasks.splice(index, 1);
      localStorage.setItem('tasks', JSON.stringify(savedTasks));
    }

    today.style.display = 'none';
    form.style.display = 'block';

    if (savedTasks.length === 0) {
      inputBox.style.display = 'block';
    }
  });

  addNewTasks.addEventListener('click', function () {
    form.style.display = 'block';
    today.style.display = 'none';
    inputBox.style.display = 'block';
    inputBox.focus();
  });

  settingsDiv.appendChild(settingsIcon);
  taskMenu.appendChild(addNewTasks);
  taskMenu.appendChild(editOption);
  taskMenu.appendChild(deleteOption);
  settingsDiv.appendChild(taskMenu);
  newTask.appendChild(checkbox);
  newTask.appendChild(label);
  newTask.appendChild(settingsDiv);

  checkbox.addEventListener('change', function () {
    newTask.classList.toggle('checked');
    const isChecked = this.checked;
    const index = savedTasks.findIndex(task => task.text === taskText);
    if (index !== -1) {
      savedTasks[index].checked = isChecked;
      localStorage.setItem('tasks', JSON.stringify(savedTasks));
    }
  });

  settingsIcon.addEventListener('click', function () {
    var taskMenu = this.nextElementSibling;
    taskMenu.classList.toggle('hidden');
  });

  if (isChecked) {
    newTask.classList.add('checked');
    checkbox.checked = true;
  }

  return newTask;
}

form.addEventListener('change', function () {
  const formDisplay = form.style.display;
  localStorage.setItem('formDisplay', formDisplay);
});

inputBox.addEventListener('input', function () {
  const inputBoxValue = inputBox.value;
  localStorage.setItem('inputBoxValue', inputBoxValue);
});

form.addEventListener('submit', function (event) {
  event.preventDefault();
  form.style.display = 'none';
  today.style.display = 'block';
  inputBox.style.display = 'none';

  var taskText = inputBox.value;

  addNewElement(taskText);

  inputBox.value = '';
  localStorage.removeItem('inputBoxValue');
});

function deleteAllTasks() {
  while (focusContainer.firstChild) {
    focusContainer.firstChild.remove();
  }

  savedTasks.length = 0;
  localStorage.removeItem('tasks');

  inputBox.style.display = 'block';

  today.style.display = 'none';
  localStorage.setItem('todayVisibility', 'none');
}

const deleteAllButton = document.getElementById('delete-all-button');
deleteAllButton.addEventListener('click', deleteAllTasks);