var searchEl = document.querySelector("#search-button");

var nameFormEl = document.querySelector("#name-form")
var fdc = document.getElementById("fdcontainer");


var getCityName = function(){
    event.preventDefault();
    var cityInputEl = document.querySelector("#city-name").value.trim();

    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?APPID=65fd11245a646ac22c447bd4432d911d&units=imperial&q=";

    fetch(apiUrl + cityInputEl)
    .then(function(currentWeatherData) {
        return currentWeatherData.json();
        // if(currentWeatherData.ok) {
        //     currentWeatherData.json().then(function(data) {
        //         console.log(data);
        //     });
        // } else {
        //     alert("Error: " + currentWeatherData.statusText);
        // }
    })
    .then(function(currentWeatherData) {
        console.log(currentWeatherData);
        
        //displayWeatherData(currentWeatherData);
        var placeName = currentWeatherData.name;
        var placeLat = currentWeatherData.coord.lat;
        var placeLon = currentWeatherData.coord.lon;
        var placeTemp = "Temperature: " + currentWeatherData.main.temp + " °F";
        var placeHumidity = "Humidity: " + currentWeatherData.main.humidity + "%";
        var placeWs = "Wind speed: " + currentWeatherData.wind.speed + " MPH";
        var WDate= moment(currentWeatherData.dt, "X").format("L");
        var iconurl = "http://openweathermap.org/img/w/" + currentWeatherData.weather[0].icon + ".png";

        var weatherContainerEl = document.querySelector("#weather-selector");
        weatherContainerEl ="";
        var cityTitle = document.getElementById("city-title");
        cityTitle.innerHTML = "<h3>" + placeName + " (" + WDate + ") <img src='" +iconurl+ "'/></h3>";

        var weatherTemp = document.getElementById("weather-temp");
        weatherTemp.innerHTML = "<p>" + placeTemp + "</p>";

        var humidity = document.getElementById("weather-humidity");
        humidity.innerHTML = "<p>" + placeHumidity + "</p>";

        var windSpeed = document.getElementById("wind-speed");
        windSpeed.innerHTML = "<p>" + placeWs + "</p>";
        
        fetch ('https://api.openweathermap.org/data/2.5/uvi?appid=65fd11245a646ac22c447bd4432d911d&lat=' +
        placeLat +
        '&lon=' + placeLon).then(function(UVdata){
            return UVdata.json();
        })
        .then(function(UVdata){
            console.log(UVdata);
            var UV = document.getElementById("uv");
        UV.innerHTML = "<p> UV Index: " + UVdata.value + "</p>";
        })
    })
    
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + cityInputEl 
    + "&appid=65fd11245a646ac22c447bd4432d911d").then(function(fivedaydata){
        return fivedaydata.json();
    }).then(function(fivedaydata){
        console.log(fivedaydata);

        document.getElementById("fdcontainer").classList.remove("hide");
        document.getElementById("fivetitle").classList.remove("hide");

        
        for (let i = 0; i < fivedaydata.list.length; i++) {
            if (fivedaydata.list[i].dt_txt.indexOf("00:00:00") > -1) {
                console.log(fivedaydata.list[i]);
            }
        }
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