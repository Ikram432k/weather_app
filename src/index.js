(()=>{
    const searchbtn = document.querySelector('.searchbtn');
    const form = document.querySelector('.userInput');
    function convertFahrenheit(temp){
        fahrenheit = Math.round((temp*9)/5+32);
        return fahrenheit;
    }
    function veiwDetails(data){
        console.log('hijh');
        document.querySelector('.cityName').textContent = data.cityname;
        document.querySelector('#temperature').textContent = `${data.temperature}°C /${convertFahrenheit(data.temperature)}°F`;
        document.querySelector('#humidity').textContent = `Humidity:${data.humidity}`;
        document.querySelector('#feels-like').textContent =  `Feels like:${data.feelsLike} °C`;
        document.querySelector('#wind').textContent = `WindSpeed:${data.windSpeed}`;
    }
    function convertdata(data){
        const {
            name:cityname,
            main:{temp:temperature,feels_like:feelsLike,humidity},
            wind:{speed:windSpeed}
        } = data;
        return{cityname,temperature,feelsLike,humidity,windSpeed}
    }
    async function getweather(city = 'chennai'){
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=1a1c4234f8b096d80ccfdcc2739f719a`,{mode:"cors"});
        const data = convertdata(await response.json());
        veiwDetails(data);
        form.reset();
        console.log(data);
    }
    function getInput(){
        const searchValue = document.querySelector('.cityInput');
        const input = searchValue.value;
        getweather(input);
    }
    searchbtn.addEventListener('click',(e)=>{
        e.preventDefault;
        getInput();
    
    })
})()