window.addEventListener('load', function() {
    var backgrounds = [
      'url(img/1.jpg)',
      'url(img/2.jpg)',
      'url(img/3.jpg)',
      'url(img/4.jpg)',
      'url(img/5.jpg)',
      'url(img/6.jpg)',
    ];
  
    var randomBackground = backgrounds[Math.floor(Math.random() * backgrounds.length)];
   
    var backgroundContainer = document.getElementById('background-container');
    backgroundContainer.style.backgroundImage = randomBackground;
  });
  