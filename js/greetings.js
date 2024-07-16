const nameInput = document.getElementById('nameInput');
const greetElement = document.querySelector('.greet');
const nameContainer = document.querySelector('.name-container');
const dateElement = document.querySelector('.date');
const storedName = localStorage.getItem('name');
const storedGreeting = localStorage.getItem('greeting');

if (storedName && storedGreeting) {
  nameInput.value = storedName;
  greetElement.textContent = storedGreeting;
  nameContainer.style.display = 'none';
  greetElement.style.color = 'white';
}

function updateName() {
  const name = nameInput.value.trim();
  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  let greeting = '';

  if (currentHour >= 5 && currentHour < 12) {
    greeting = `Good morning, ${name}!`;
    greetElement.style.color = 'white';
  } else if (currentHour >= 12 && currentHour < 17) {
    greeting = `Good afternoon, ${name}!`;
    greetElement.style.color = 'white';
  } else if (currentHour >= 17 && currentHour < 21) {
    greeting = `Good evening, ${name}!`;
    greetElement.style.color = 'white';
  } else {
    greeting = `Good night, ${name}!`;
    greetElement.style.color = 'white';
  }

  greetElement.textContent = name !== '' ? greeting : '';
  nameContainer.style.display = name !== '' ? 'none' : 'block';

  localStorage.setItem('name', name);
  localStorage.setItem('greeting', greetElement.textContent);

  nameInput.value = '';
}

nameInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    updateName();
  }
});
