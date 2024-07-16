const content = document.getElementById('content');
const author  = document.getElementById('author');

axios.get('https://api.quotable.io/random').then(res => {
    content.textContent = '"' + res.data.content + '"';
    author.textContent =  "' - " + res.data.author + " '";
});