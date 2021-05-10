// var city = document.getElementById('searchTerm').value

function weatherAPI() {
    var city = document.getElementById('searchTerm').value

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

            var displayCity = document.querySelector("#list-city-search");

            var displayCityInfo = document.querySelector("#one-day-forecast");

            var listCitySearchEl = document.createElement("li");
            listCitySearchEl.className = "city-list";
            listCitySearchEl.innerHTML = "<div class='city-name'>" + searchTerm.value + "</div>"
            displayCity.appendChild(listCitySearchEl);

            var cityNameEl = document.createElement("h2");
            cityNameEl.innerHTML =`<h2>${city}</h2>`;
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
        })
 
}

weatherAPI();