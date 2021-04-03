function weatherAPI() {
    var searchTerm = document.querySelector("#searchTerm").value;
    console.log(searchTerm);
    fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid=663fbbeadd446c56388d07f33b9c6bca`
    )
    .then(funtion() {
        return 
    })
}