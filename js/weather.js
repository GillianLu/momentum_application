const weatherIcon = document.getElementById("weatherIcon");
const weatherCard = document.getElementById("weatherCard");

weatherIcon.addEventListener("click", function() {
  weatherCard.classList.toggle("hidden");
});

const apiKey = "a73be85aa5c6f6e1f92edfd554848061";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    var data = await response.json();

    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
}

searchBtn.addEventListener("click", ()=> {
    checkWeather(searchBox.value);
})




