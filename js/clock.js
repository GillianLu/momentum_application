const time = document.getElementById('time');
const date = document.getElementById('date');

function showTime() {
  let today = new Date();
  let hour = today.getHours();
  let min = today.getMinutes();
  let sec = today.getSeconds();
  let formattedDate = formatDate(today);

  const amPM = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12 || 12;

  time.textContent = `${hour}:${addZero(min)}:${addZero(sec)} ${amPM}`;
  date.textContent = formattedDate;

  setTimeout(showTime, 1000);
}

function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

function formatDate(date) {
  const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
  return date.toLocaleDateString('en-PH', options);
}

showTime();
