(() => {
  const searchbtn = document.querySelector('.searchbtn');
  const form = document.querySelector('.userInput');
  const errormsg = document.querySelector('.error-msg');
  function convertFahrenheit(temp) {
    const fahrenheit = Math.round((temp * 9) / 5 + 32);
    return fahrenheit;
  }
  function veiwDetails(data) {
    if (!data) return;
    document.querySelector('.cityName').textContent = data.cityname;
    document.querySelector('#temperature').textContent = `${data.temperature}°C /${convertFahrenheit(data.temperature)}°F`;
    document.querySelector('#humidity').textContent = `Humidity:${data.humidity}%`;
    document.querySelector('#feels-like').textContent = `Feels like:${data.feelsLike} °C`;
    document.querySelector('#wind').textContent = `WindSpeed:${data.windSpeed} km/h`;
  }
  function convertdata(data) {
    const {
      name: cityname,
      main: { temp: temperature, feels_like: feelsLike, humidity },
      wind: { speed: windSpeed },
    } = data;
    return {
      cityname, temperature, feelsLike, humidity, windSpeed,
    };
  }
  async function getweather(city = 'chennai') {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=1a1c4234f8b096d80ccfdcc2739f719a`, { mode: 'cors' });
      if (!response.ok) throw new Error(`Location ${city} not found`);
      const data = convertdata(await response.json());
      veiwDetails(data);
    } catch (error) {
      alert(error);
    }
  }
  function getInput() {
    const searchValue = document.querySelector('.cityInput');
    const input = searchValue.value;
    if (searchValue.validity.valueMissing) {
      errormsg.textContent = 'Please enter the location';
    } else {
      errormsg.textContent = '';
      getweather(input);
      form.reset();
    }
  }
  searchbtn.addEventListener('click', (e) => {
    e.preventDefault();
    getInput();
  });
})();
