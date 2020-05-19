$("#search-button").on("click", function(event) {
    event.preventDefault();
    var cityName = $("#search-input").val();
    var currentDay = moment().format("MMMM Do YYYY");

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
        $("#wind").text("wind speed:" + wind);
        $("#humidity").text("Humidity:" + humidity);
        $("#temp").text("Tempeture:" + temp);
        

        // FIND UV INDEX IN DIFFERENT AJAX CALL
         
      var queryURL2 = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + response.coord.lat + "&lon=" + response.coord.lon;
      $.ajax({
          url: queryURL2,
          method: "GET"
      }).then(function(response) {
          console.log(queryURL2)
          console.log(response)
          var uvIndex = response.value 
          $("#uvIndex").text("uv-Index:" + uvIndex);
      
    });
    })

    // FOR FIVE DAY FORECAST

    var queryURL3 = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIKey;
    $.ajax({
        url: queryURL3,
        method: "GET"
    }).then(function(response) {
        console.log(queryURL3)
        console.log(response)
        console.log(response.list[0].main.temp);
        $("temp-1").text("tempeture:" + temp);

        // Want to store the temperatures based on moment.js
        // So we need the current day and current hour
        var day1 = moment().add(1, 'd').format("MMMM Do YYYY");
        console.log(day1);
        var currentHour = moment().format("HH");
        console.log(currentHour);

        var j = 0;
        for (var i = 0; i < 5; i++) {
            // if currentHour is 0-2, then what list indexes are we using? 7, 15, 23, 31, 39
            if (currentHour >= 0 && currentHour < 3) {
                var element = response.list[j + 7];
                console.log(element);
            }

            if (currentHour >= 15 && currentHour < 18) {
                var element = response.list[j + 4];
                console.log(element);
                j = j+8;
            }
            // if currentHour is 3-5, then you do 0, 8, 16, 24, 32
            //var element = response.list[j+8];
        }
        // 0-3, 3-6, 6-9, 9-12, 12-15, 15-18, 18-21, 21-24
        // another way: see if something like "15:00:00" is in response.list[i].dt_txt using indexOf
    });








});
