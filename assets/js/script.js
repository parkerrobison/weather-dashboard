var cityInputEl = document.querySelector("#city-name");
var nameFormEl = document.querySelector("#name-form");

// function that gets all data from api
// on formsubmit call the above function with the value in input.
// load history should call the first function with the button text



// make it so multiple same search answers wont populate in the recordSearch list
// refactor
// include set localstorage in record search
// include get localstorage in load history
// limit history to 8 items.

// This function displays all of the weather data on the right side of the page.
var printWeather = function () {
    event.preventDefault();
    var cityInput = cityInputEl.value.trim();
    
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?APPID=65fd11245a646ac22c447bd4432d911d&units=imperial&q=";
    // this fetch request gathers data for the town name, date, icon, temp, humidity, wind speed, and long/lat.
    fetch(apiUrl + cityInput)
        .then(function (currentWeatherData) {
            // check to see if the data is valid.
            if (currentWeatherData.ok) {
                return currentWeatherData.json();
            } else {
                alert("Error: " + currentWeatherData.statusText);
            }
        })
        .then(function (currentWeatherData) {
            if (!currentWeatherData) {
                alert("No weather data available.")
            }
            recordSearch();
            // variables for display data
            var placeName = currentWeatherData.name;
            var placeLat = currentWeatherData.coord.lat;
            var placeLon = currentWeatherData.coord.lon;
            var placeTemp = "Temperature: " + currentWeatherData.main.temp + " °F";
            var placeHumidity = "Humidity: " + currentWeatherData.main.humidity + "%";
            var placeWs = "Wind speed: " + currentWeatherData.wind.speed + " MPH";
            var WDate = moment(currentWeatherData.dt, "X").format("l");
            var iconurl = "http://openweathermap.org/img/w/" + currentWeatherData.weather[0].icon + ".png";

            // display for the first 5 data fields
            var weatherContainerEl = document.querySelector("#weather-container");
            weatherContainerEl.classList.remove("hide");
            var cityTitle = document.getElementById("city-title");
            cityTitle.innerHTML = "<h3>" + placeName + " (" + WDate + ") <img src='" + iconurl + "'/></h3>";

            var weatherTemp = document.getElementById("weather-temp");
            weatherTemp.innerHTML = "<p>" + placeTemp + "</p>";

            var humidity = document.getElementById("weather-humidity");
            humidity.innerHTML = "<p>" + placeHumidity + "</p>";

            var windSpeed = document.getElementById("wind-speed");
            windSpeed.innerHTML = "<p>" + placeWs + "</p>";

            // this request is for uv data. It requires lat and lon from the previous request.
            fetch('https://api.openweathermap.org/data/2.5/uvi?appid=65fd11245a646ac22c447bd4432d911d&lat=' +
                placeLat +
                '&lon=' + placeLon).then(function (UVdata) {
                    return UVdata.json();
                })
                .then(function (UVdata) {
                    // code will display a badge + color indicating severity of the UV index
                    var UV = document.getElementById("uv");
                    UV.innerHTML = "<p> UV Index: <span class='UVAlert badge'>" + UVdata.value + "</span></p>";
                    if (UVdata.value > 7) {
                        $(".UVAlert").addClass("badge-danger");
                    } else if (UVdata.value < 8 && UVdata.value > 2) {
                        $(".UVAlert").addClass("badge-warning");
                    } else {
                        $(".UVAlert").addClass("badge-success");
                    }
                })
        })
    // this request gets data for the 5 day forecast
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput
        + "&units=imperial&appid=65fd11245a646ac22c447bd4432d911d").then(function (fivedaydata) {
            return fivedaydata.json();
        }).then(function (fivedaydata) {
            // empties out the div before any new boxes are added
            $(".forecast").empty();
            document.getElementById("fivetitle").classList.remove("hide");
            // for loop finds each instance of noon for the next 5 days and displays the data from those objects.
            for (let i = 0; i < fivedaydata.list.length; i++) {
                if (fivedaydata.list[i].dt_txt.indexOf("12:00:00") > -1) {

                    var col = $("<div>").addClass("my-1 col-lg-4 col-xl");
                    var card = $("<div>").addClass("card bg-primary text-white");
                    var cardBody = $("<div>").addClass("card-body");
                    var title = $("<div>").addClass("card-title").text(moment(fivedaydata.list[i].dt, "X").format("l"));
                    var icon = $("<img>").attr("src", "https://openweathermap.org/img/w/" + fivedaydata.list[i].weather[0].icon + ".png");
                    var tempP = $("<p>").addClass("card-text fd-text").text("Temp: " + fivedaydata.list[i].main.temp + " °F")
                    var windP = $("<p>").addClass("card-text fd-text").text("Humidity: " + fivedaydata.list[i].main.humidity + "%")

                    col.append(card.append(cardBody.append(title, icon, tempP, windP)));
                    $(".forecast").append(col);
                }
            }
        })
}

// records the entries into the form input as listed buttons.
var recordSearch = function () {
    console.log("record")
    var hCard = $("<button>").addClass("list-group-item list-group-action-item text-left")
        .attr({ "type": "button", "id": "history-btn" })
        .text(cityInputEl.value);
    $('#history-list').append(hCard);

    
    // clears the input
    cityInputEl.value = "";
    loadHistory();
}

// loads the data from a selected button from the history list. 
var loadHistory = function () {
    console.log("load history")
    var historyBtns = document.querySelectorAll(".list-group-action-item");
    historyBtns.forEach(function (historyBtn) {
        historyBtn.addEventListener("click", function (event) {
            var hCity = event.target.innerText;
            if (hCity) {
                cityInputEl.value = hCity;
                printWeather();
                cityInputEl.value = "";
            }
        })
    })
}

// checks to see if the entry is blank. 
var formSubmitHandler = function () {
    event.preventDefault();
    var city = cityInputEl.value.trim();
    if (city) {
        printWeather();
    } else {
        alert("Please enter a city's name")
    }
}

nameFormEl.addEventListener("submit", formSubmitHandler);

