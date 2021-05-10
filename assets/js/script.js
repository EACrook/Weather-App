function weatherAPI() {
    const city = document.getElementById('searchTerm').value

    fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=663fbbeadd446c56388d07f33b9c6bca`
        )
        .then(function (locationResponse) {
            return locationResponse.json();
        })
        .then(function (data) {
            console.log(data.coord.lon)
            console.log(data.coord.lat)

            var cityLon = data.coord.lon;

            var cityLat = data.coord.lat;

            return fetch(
                `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&exclude=alerts,minutely&appid=663fbbeadd446c56388d07f33b9c6bca`
            )
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            console.log(response);
        })
    // var searchTerm = document.querySelector("#searchTerm").value;
    // console.log(searchTerm);
    // fetch(
    //     `https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&appid=663fbbeadd446c56388d07f33b9c6bca`
    // )
    // .then(function(weatherResponse) {
    //     return weatherResponse.json();   
    // })
    // .then(function(weatherResponse) {
    //     var displayCity = document.querySelector("#list-city-search");

    //     var listCitySearchEl = document.createElement("li");
    //     listCitySearchEl.className="city-list";
    //     listCitySearchEl.innerHTML= "<h3 class='city-name'>" + searchTerm.value + "</h3>"
    //     displayCity.appendChild(listCitySearchEl);
    //     // var weatherLat = weatherResponse.lat;

    // })
}

weatherAPI();