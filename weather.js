$("#search-button").on("click", function(event) {
    event.preventDefault();
    var cityName = $("#search-input").val();

    // FOR CURRENT FORECAST
    var APIKey = "4acc1684606b5c94bad30135c751d96e";
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&APPID=" + APIKey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(queryURL)
        console.log(response)
        var city = response.name
        var wind = response.wind.speed
        var humidity = response.main.humidity
        var temp = Math.round((response.main.temp-273.15) * 1.80 + 32);

        $("#city").text(city);
        $("#wind").text(wind);
        $("#humidity").text(humidity);
        $("#temp").text(temp);

        // FIND UV INDEX IN DIFFERENT AJAX CALL
        $("#uvIndex").text(uvIndex);
    });


    // FOR FIVE DAY FORECAST
});

