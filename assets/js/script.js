var searchEl = document.querySelector("#search-button");
var cityInputEl = document.querySelector("#city-name");
var nameFormEl = document.querySelector("#name-form")
var searchHistory = [];

var getCityName = function(){
    event.preventDefault();
    
    var cityInput = cityInputEl.value.trim();

    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?APPID=65fd11245a646ac22c447bd4432d911d&units=imperial&q=";

    fetch(apiUrl + cityInput)
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
        
        var placeName = currentWeatherData.name;
        var placeLat = currentWeatherData.coord.lat;
        var placeLon = currentWeatherData.coord.lon;
        var placeTemp = "Temperature: " + currentWeatherData.main.temp + " °F";
        var placeHumidity = "Humidity: " + currentWeatherData.main.humidity + "%";
        var placeWs = "Wind speed: " + currentWeatherData.wind.speed + " MPH";
        var WDate= moment(currentWeatherData.dt, "X").format("l");
        var iconurl = "http://openweathermap.org/img/w/" + currentWeatherData.weather[0].icon + ".png";

        var weatherContainerEl = document.querySelector("#weather-container");
        weatherContainerEl.classList.remove("hide");
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
        UV.innerHTML = "<p> UV Index: <span class='UVAlert badge'>" + UVdata.value + "</span></p>";

        if (UVdata.value > 7) {
            
            $(".UVAlert").addClass("badge-danger");
        }else if (UVdata.value < 8 && UVdata.value > 2) {
            
            $(".UVAlert").addClass("badge-warning");
        } else {
            
            $(".UVAlert").addClass("badge-success");
        }
        })
    })
    
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput 
    + "&units=imperial&appid=65fd11245a646ac22c447bd4432d911d").then(function(fivedaydata){
        return fivedaydata.json();
    }).then(function(fivedaydata){
        console.log(fivedaydata);
        $(".forecast").empty();
        document.getElementById("fivetitle").classList.remove("hide");

        for (let i = 0; i < fivedaydata.list.length; i++) {
            if (fivedaydata.list[i].dt_txt.indexOf("12:00:00") > -1) {
                
                var col = $("<div>").addClass("col");
                var card = $("<div>").addClass("card bg-primary text-white");
                var cardBody = $("<div>").addClass("card-body");
               
                console.log(fivedaydata.list[i]);
                var title = $("<div>").addClass("card-title").text(moment(fivedaydata.list[i].dt, "X").format("l"));
                var icon = $("<img>").attr("src", "https://openweathermap.org/img/w/" + fivedaydata.list[i].weather[0].icon + ".png");
                var tempP = $("<p>").addClass("card-text fd-text").text("Temp: " + fivedaydata.list[i].main.temp + " °F")
                var windP = $("<p>").addClass("card-text fd-text").text("Humidity: " + fivedaydata.list[i].main.humidity + "%")
                

                col.append(card.append(cardBody.append(title, icon, tempP, windP)));
                $(".forecast").append(col);
            }
        }
    })
//    saveSearch();
}

// var saveSearch = function () {
//     searchHistory.push (cityInputEl.value);
//     localStorage.setItem("city", JSON.stringify(searchHistory));
//     cityInputEl.value = "";
// }



nameFormEl.addEventListener("submit", getCityName);


// var formSubmitHandler = function() {
//     event.preventDefault();
//     var city = cityInput.value.trim();

//     if (city) {
//         getCityName()
//         cityInput.value ="";
//     } else {
//         alert("Please enter a city's name")
//     }
// }

// var displayWeatherData = function() {
//     
// }



// display pulled data on page 
// add a listener for button click
// create dynamic element containers for the weather data
// pull data for the five day forecast
// create dynamic element containers for the 5 day forecast
// style the boxes
// save search reult as a history item on left hand side of screen
// display history list on left side
// make the list items clickable.