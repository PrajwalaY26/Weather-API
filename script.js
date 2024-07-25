function displayWeather(result) {
  let currentValue = document.querySelectorAll(".current-value");
  let temperatureNow = Math.round(result.data.list[0].main.temp);
  let minTomorrow = Math.round(result.data.list[7].main.temp_min) - 2;
  let maxTomorrow = Math.round(result.data.list[7].main.temp_max) + 2;
  let minSecond = Math.round(result.data.list[15].main.temp_min) - 2;
  let maxSecond = Math.round(result.data.list[15].main.temp_max) + 2;
  let minThird = Math.round(result.data.list[23].main.temp_min) - 2;
  let maxThird = Math.round(result.data.list[23].main.temp_max) + 2;
  let minFourth = Math.round(result.data.list[31].main.temp_min) - 2;
  let maxFourth = Math.round(result.data.list[31].main.temp_max) + 2;
  let minFifth = Math.round(result.data.list[39].main.temp_min) - 2;
  let maxFifth = Math.round(result.data.list[39].main.temp_max) + 2;
  let currentStatus = document.querySelector(".current-status");
  let status = result.data.list[0].weather[0].description;
  let chanceOfRain = document.querySelector(".chance-of-rain");
  let chanceOfRainValue = Math.round(result.data.list[0].pop * 100);
  let humidity = document.querySelector(".humidity");
  let humidityValue = Math.round(result.data.list[0].main.humidity);
  let windSpeed = document.querySelector(".wind-speed");
  let windSpeedValue = Math.round(result.data.list[0].wind.speed);
  let currentIcon = document.querySelector(".currentimage");
  let currentIconValue = result.data.list[0].weather[0].icon;
  if (currentIconValue === "01n") {
    currentIconValue = "night";
  }
  let firstIcon = document.querySelector(".followingdaysimage-first");
  let firstIconValue = result.data.list[7].weather[0].icon;
  let secondIcon = document.querySelector(".followingdaysimage-second");
  let secondIconValue = result.data.list[15].weather[0].icon;
  let thirdIcon = document.querySelector(".followingdaysimage-third");
  let thirdIconValue = result.data.list[23].weather[0].icon;
  let fourthIcon = document.querySelector(".followingdaysimage-fourth");
  let fourthIconValue = result.data.list[31].weather[0].icon;
  let fifthIcon = document.querySelector(".followingdaysimage-fifth");
  let fifthIconValue = result.data.list[39].weather[0].icon;

  currentValue[0].textContent = `${temperatureNow}`;
  currentValue[1].textContent = `${maxTomorrow}`;
  currentValue[2].textContent = `${minTomorrow}`;
  currentValue[3].textContent = `${maxSecond}`;
  currentValue[4].textContent = `${minSecond}`;
  currentValue[5].textContent = `${maxThird}`;
  currentValue[6].textContent = `${minThird}`;
  currentValue[7].textContent = `${maxFourth}`;
  currentValue[8].textContent = `${minFourth}`;
  currentValue[9].textContent = `${maxFifth}`;
  currentValue[10].textContent = `${minFifth}`;
  currentStatus.textContent = `${status} `;
  chanceOfRain.textContent = `${chanceOfRainValue}`;
  humidity.textContent = `${humidityValue}`;
  windSpeed.textContent = `${windSpeedValue}`;
  currentIcon.setAttribute(
    "src",
    `media/365850-weather/png/${currentIconValue}.png`
  );
  currentIcon.setAttribute("alt", `${status} image`);
  firstIcon.setAttribute(
    "src",
    `media/365850-weather/png/${firstIconValue}.png`
  );
  firstIcon.setAttribute("alt", `${firstIconValue} image`);
  secondIcon.setAttribute(
    "src",
    `media/365850-weather/png/${secondIconValue}.png`
  );
  secondIcon.setAttribute("alt", `${secondIconValue} image`);
  thirdIcon.setAttribute(
    "src",
    `media/365850-weather/png/${thirdIconValue}.png`
  );
  thirdIcon.setAttribute("alt", `${thirdIconValue} image`);
  fourthIcon.setAttribute(
    "src",
    `media/365850-weather/png/${fourthIconValue}.png`
  );
  fourthIcon.setAttribute("alt", `${fourthIconValue} image`);
  fifthIcon.setAttribute(
    "src",
    `media/365850-weather/png/${fifthIconValue}.png`
  );
  fifthIcon.setAttribute("alt", `${fifthIconValue} image`);
}

function fetchWeather() {
  let apiKey = '84294cc938043613f2ed4f8693716176'; 
  let city = document.querySelector(".the-city").textContent.trim();
  let unit = document.querySelector(".new-unit").textContent === ` /ºC` ? "imperial" : "metric";
  let apiEndPoint = `https://api.openweathermap.org/data/2.5/forecast`;
  let apiUrl = `${apiEndPoint}?q=${city}&units=${unit}&appid=${apiKey}`;

  axios.get(apiUrl).then(displayWeather).catch(error => {
    console.error("Error fetching weather data:", error);
  });
}
fetchWeather();

function updateCity(results) {
  let city = document.querySelector(".the-city");
  city.textContent = results.data.name;
  fetchWeather();
}

function getCoordinates(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = '84294cc938043613f2ed4f8693716176'; 
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;  
  
  axios.get(apiUrl)
    .then(updateCity)
    .catch(error => {
      console.error("Error fetching weather data:", error);
    });
}

function locateUser() {
  navigator.geolocation.getCurrentPosition(getCoordinates);
}

let yourLocationButton = document.querySelector(".your-location");
yourLocationButton.addEventListener("click", locateUser);

function formatDate() {
  let currentDate = document.querySelector("#current-date");
  let dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  function calculateDays(eachDay) {
    let dayIndex = (new Date().getDay() + eachDay) % 7;
    return dayNames[dayIndex];
  }

  let monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = monthNames[new Date().getMonth()];
  let number = new Date().getDate();
  let year = new Date().getFullYear();

  currentDate.textContent = `${calculateDays(0)}, ${month} ${number}, ${year}`;

  document.querySelector("#followingdays-second").textContent = calculateDays(2);
  document.querySelector("#followingdays-third").textContent = calculateDays(3);
  document.querySelector("#followingdays-fourth").textContent = calculateDays(4);
  document.querySelector("#followingdays-fifth").textContent = calculateDays(5);

}

formatDate();

function searchCity(result) {
  let cityToSearch = result.data.name;
  let cityElement = document.querySelector(".the-city");
  cityElement.textContent = cityToSearch;
  fetchWeather();
}

function handleError() {
  alert(
    `👾 Oops! We don't recognize that location! Please, check the spelling, and remember you should input the city name in English.`
  );
}

function validateInput() {
  let city = document.querySelector(".change-city-input").value.trim();
  if (!city) {
    alert(
      `Looks like you didn't type anything 👁‍🗨👁‍🗨. Please, write the name of your location in the Change City area.`
    );
    return;
  }

  let apiKey = `84294cc938043613f2ed4f8693716176`;
  let unit = "imperial";
  let apiEndPoint = `https://api.openweathermap.org/data/2.5/weather`;
  let apiUrl = `${apiEndPoint}?q=${city}&units=${unit}&appid=${apiKey}`;

  axios.get(apiUrl).then(searchCity).catch(handleError);
}

function submitCity(event) {
  event.preventDefault();
  validateInput();
}

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", submitCity);

function toCelsius(values) {
  let valuesconverted = parseInt(values.innerHTML);
  values.innerHTML = ` ${Math.round(((valuesconverted - 32) * 5) / 9)}`;
}

function unitToCelsius(text) {
  text.innerHTML = `ºC`;
}

function toFahrenheit(values) {
  let valuesconverted = parseInt(values.innerHTML);
  values.innerHTML = ` ${Math.round((valuesconverted * 9) / 5 + 32)}`;
}

function unitToFahrenheit(text) {
  text.innerHTML = `ºF`;
}

function changeUnits() {
  let newUnit = document.querySelector(".new-unit");
  let currentUnit = document.querySelectorAll(".current-unit");
  let currentValue = document.querySelectorAll(".current-value");
  if (newUnit.innerHTML === ` /ºF`) {
    newUnit.innerHTML = ` /ºC`;
    currentUnit.forEach(unitToFahrenheit);
    currentValue.forEach(toFahrenheit);
  } else {
    newUnit.innerHTML = ` /ºF`;
    currentUnit.forEach(unitToCelsius);
    currentValue.forEach(toCelsius);
  }
}

let temperatureUnits = document.querySelector(".new-unit");
temperatureUnits.addEventListener("click", changeUnits);
