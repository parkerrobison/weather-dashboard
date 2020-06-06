var searchEl = document.querySelector("#search-button");

var nameFormEl = document.querySelector("#name-form")



var getCityName = function(){
    event.preventDefault();
    var cityInputEl = document.querySelector("#city-name").value.trim();

    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?APPID=65fd11245a646ac22c447bd4432d911d&units=imperial&q=";

    fetch(apiUrl + cityInputEl)
    .then(function(response) {
        return response.json();
        // if(response.ok) {
        //     response.json().then(function(data) {
        //         console.log(data);
        //     });
        // } else {
        //     alert("Error: " + response.statusText);
        // }
    })
    .then(function(response) {
        console.log(response);
        
        //displayWeatherData(response);
        var placeName = response.name;
        var placeTemp = "Temperature: " + response.main.temp + " °F";
        var placeHumidity = "Humidity: " + response.main.humidity + "%";
        var placeWs = "Wind speed: " + response.wind.speed + " MPH";

        var weatherContainerEl = document.querySelector("#weather-selector");
        weatherContainerEl ="";
        var cityTitle = document.getElementById("city-title");
        cityTitle.innerHTML = "<h3>" + placeName + "</h3>";

        var weatherTemp = document.getElementById("weather-temp");
        weatherTemp.innerHTML = "<p>" + placeTemp + "</p>";

        var humidity = document.getElementById("weather-humidity");
        humidity.innerHTML = "<p>" + placeHumidity + "</p>";

        var windSpeed = document.getElementById("wind-speed");
        windSpeed.innerHTML = "<p>" + placeWs + "</p>";
        
        
    })
}

// var formSubmitHandler = function() {
//     event.preventDefault();
//     var city = cityInputEl.value.trim();

//     if (city) {
//         getCityName()
//         cityInputEl.value ="";
//     } else {
//         alert("Please enter a city's name")
//     }
// }

// var displayWeatherData = function() {
//     
// }

nameFormEl.addEventListener("submit", getCityName);

// display pulled data on page 
// add a listener for button click
// create dynamic element containers for the weather data
// pull data for the five day forecast
// create dynamic element containers for the 5 day forecast
// style the boxes
// save search reult as a history item on left hand side of screen
// display history list on left side
// make the list items clickable.