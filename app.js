const searchBar = document.getElementById("searchbar");
const searchBtn = document.getElementById("search-btn");
const weatherCard = document.getElementById("weather-card");
const toggleBtn = document.querySelector(".toggle");

const API_KEY = "3a95509fbcc4430926422cf4c7f72d2f";
let cityName = "Antalya";
let celsius = false;
let tempeture;
let tempFells;
async function getWeather() {
  cityName = searchBar.value;
  if (cityName === "") {
    cityName = "London";
  }
  const res = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`
  );
  const data = await res.json();

  const name = data.name;
  const weather = data.weather[0].main;
  const description = data.weather[0].description;
  const temp = data.main.temp;
  const fellsLike = data.main.feels_like;
  const wind = data.wind.speed;
  const humidity = data.main.humidity;

  tempeture = temp;
  tempFells = fellsLike;

  weatherCard.innerHTML = `
    <div>
      <h1>${name}</h1>
      <h1>${weather}</h1>
      <h2>${description}</h2>
    </div>
    <div id="toggle">
      <h1>Temperature: ${temp}</h1>
      <h1>Fells Like:  ${fellsLike}</h1>
    </div>
    <div>
      <h1>Wind: ${wind}</h1>
      <h1>Humidity: ${humidity}%</h1>
    </div>
  `;
}

getWeather();

searchBtn.addEventListener("click", getWeather);
toggleBtn.addEventListener("click", () => {
  const toggleTemp = document.getElementById("toggle");

  if (celsius) {
    celsius = false;
    toggleTemp.innerHTML = `
      <h1>Temperature: ${tempeture}</h1>
      <h1>Fells Like:  ${tempFells}</h1>
    `;
  } else {
    toggleTemp.innerHTML = `
      <h1>Temperature: ${(tempeture - 32) * (5 / 9)}C</h1>
      <h1>Fells Like:  ${(tempFells - 32) * (5 / 9)}C</h1>
    `;
    celsius = true;
  }
});
