window.addEventListener('load', (event) => {
  // console.log('page is fully loaded', event);
  const fetchWeatherCoord = (lat,lon) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=d2d27ff0edfac42ee9bd04957b1b9f5b`)
    .then((response) => response.json())
    .then((data) => weather.displayWeather(data))
  }

  function getLocation(){
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition(showPosition);
    }
  }
  
  function showPosition(position){
    const lati = position.coords.latitude;
    const longi = position.coords.longitude;
    fetchWeatherCoord(lati, longi);
  }
  getLocation();
});

let weather = {
  apiKey : "d2d27ff0edfac42ee9bd04957b1b9f5b",
  fetchWeather : (city) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weather.apiKey}`)
    .then((response) => response.json())
    .then((data) => weather.displayWeather(data));
  },
  displayWeather : (data) => {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    // console.log(name, icon, description, temp, humidity, speed);
    document.querySelector('.city span').innerText = name;
    document.querySelector('.temp span').innerText = temp;
    document.querySelector('.description').innerText = description;
    document.querySelector('.humidity span').innerText = humidity;
    document.querySelector('.wind span').innerText = speed;
    document.querySelector('.icon').src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    document.querySelector('.icon').alt = icon;
  }
}

const btn = document.querySelector('button');
const searchBar = document.querySelector('.search-bar');
btn.addEventListener('click', () => {
  weather.fetchWeather(searchBar.value);
});