// var city = document.getElementById('searchTerm').value

function weatherAPI() {
    var city = document.getElementById('searchTerm').value
    displayCitySearchTerm(city)

    var cities = [];

    if(  localStorage.getItem('cities')) {
        cities = JSON.parse( localStorage.getItem('cities'))

    }

    cities.push(city)
    localStorage.setItem('cities', JSON.stringify(cities))

    fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=663fbbeadd446c56388d07f33b9c6bca`
        )
        .then(function (locationResponse) {
            return locationResponse.json();
        })
        .then(function (data) {
            // console.log(data.coord.lon)
            // console.log(data.coord.lat)

            var cityLon = data.coord.lon;

            var cityLat = data.coord.lat;

            return fetch(
                `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&units=imperial&exclude=alerts,minutely&appid=663fbbeadd446c56388d07f33b9c6bca`
            )
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            console.log(response);
            console.log(response.current.dt)
            var temperature = response.current.temp;

            var windSpeed = response.current.wind_speed;

            var humidity = response.current.humidity;

            var uvIndex = response.current.uvi;

            

            var displayCityInfo = document.querySelector("#one-day-forecast");
            displayCityInfo.innerHTML = ""

          

            var cityNameEl = document.createElement("h2");
            cityNameEl.innerHTML = `<h2>${city}</h2>`;
            displayCityInfo.appendChild(cityNameEl)

            var cityInfoEl = document.createElement("div");
            cityInfoEl.innerHTML =
                `<div>
            Temp: ${temperature} 
            <br>Wind: ${windSpeed} 
            <br>Humidity: ${humidity} 
            <br>UV Index: ${uvIndex} 
            </div>`;
            displayCityInfo.appendChild(cityInfoEl);

            fiveDay(response.daily)
        })
    // .then(function (response) {
    //   console.log(response.daily)
    //})

}

function displayCitySearchTerm(searchTerm) {
    var displayCity = document.querySelector("#list-city-search");
    var listCitySearchEl = document.createElement("li");
    listCitySearchEl.className = "city-list";
    listCitySearchEl.innerHTML = "<div class='city-name'>" + searchTerm + "</div>"
    displayCity.appendChild(listCitySearchEl);
}

function displayPastSeaches() {
    var pastSearches = JSON.parse(localStorage.getItem('cities'))
    for (let i = 0; i < pastSearches.length; i++) {
        displayCitySearchTerm(pastSearches[i])
        
    }
}
displayPastSeaches()
function fiveDay(daily) {
    console.log('Dailys function!!!', daily[0])
    var fiveDayDisplay = document.querySelector("#five-day-forecast")
    fiveDayDisplay.innerHTML = ""
    
    for (let i = 1; i < 6; i++) {

        var date = daily[i].dt

        var weatherPicture = "http://openweathermap.org/img/w/" + daily[i].weather[0].icon + ".png" 

        var dailytemp = daily[i].temp.day

        var dailyWind = daily[i].wind_speed

        var dailyHumidity = daily[i].humidity

    

        var cityInfoEl = document.createElement("div");
        cityInfoEl.innerHTML =
            `<div>
    Date: ${date}
    <br> <img src=${weatherPicture}></img>
    <br>Temp: ${dailytemp} 
    <br>Wind: ${dailyWind} 
    <br>Humidity: ${dailyHumidity} 
    </div>`;
        fiveDayDisplay.appendChild(cityInfoEl);
    }

}

// function singleDay() {

// }

weatherAPI();