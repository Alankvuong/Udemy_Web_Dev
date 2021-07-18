const express = require("express");
const https = require("https");

const app = express();


app.get("/", function(req, res) {		// callback function
	//res.send("Hello");
	const weatherAPI_url = "https://api.openweathermap.org/data/2.5/weather?q=Seattle&appid=df7631cdda75b7f31ed0716e20368687&units=imperial"

	https.get(weatherAPI_url, function(response){
		console.log("Status code: "  + res.statusCode);
		
		response.on("data", function(data){
			const weatherData = JSON.parse(data);		// Converts hex to JSON
			const temp = weatherData.main.temp;
			const weatherDescription = weatherData.weather[0].description;
			const weatherIcon =  weatherData.weather[0].icon
			const iconUrl = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
			console.log("The temperature in Seattle is: " + weatherData.main.temp);
			console.log("The current condition in Seattle is " + weatherData.weather[0].description);

			res.write("<h1><u>Weather</u></h1>");
			res.write("<h2>The temperature is Seattle is " + temp + " degrees Fahrenheit</h2>");
			res.write("<h3>The current condition in Seattle is " + weatherDescription + ".</h3>");

			res.write("<img src="+ iconUrl + ">");
			res.send();
		})		
	})
})			



app.listen(3000, function() {
	console.log("Server listening on port 3000. http://localhost:3000");
}
)