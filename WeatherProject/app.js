const express = require("express");
const https = require("https");

const app = express();


app.get("/", function(req, res) {		// callback function
	res.send("Hello");
	const weatherAPI_url = "https://api.openweathermap.org/data/2.5/weather?q=Seattle&appid=df7631cdda75b7f31ed0716e20368687&units=imperial"

	https.get(weatherAPI_url, function(response){
		console.log("Status code: "  + res.statusCode);
		
		response.on("data", function(data){
			const weatherData = JSON.parse(data);		// Converts hex to JSON
			console.log("The temperature in Seattle is: " + weatherData.main.temp);
			console.log("The current condition in Seattle is " + weatherData.weather[0].description);
		})		
	})
})			



app.listen(3000, function() {
	console.log("Server listening on port 3000. http://localhost:3000");
}
)