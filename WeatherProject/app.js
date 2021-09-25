const express = require("express");
const https = require("https");
const { traceDeprecation } = require("process");
const bodyParser = require("body-parser");

const app = express();

app.use(express.urlencoded({extended: true}));



app.get("/", function(req, res) {		// callback function
	res.sendFile(__dirname + "/index.html");
})			

app.post("/", function(req, res){
	const cityName = req.body.cityName;				// Gets the city name from the body of the request.
	console.log(cityName);

	const units = req.body.units;					// Uses the "value" property in the input elemment to obtain the value of the radio button
	console.log(units);

	const cityQuery = cityName;
	const apiKey = "df7631cdda75b7f31ed0716e20368687";

	const weatherAPI_url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityQuery + "&appid=" + apiKey + "&units=" + units;

	https.get(weatherAPI_url, function(response){
		console.log("Status code: "  + res.statusCode);
		
		response.on("data", function(data){ 
			const weatherData = JSON.parse(data);		// Converts hex to JSON
			const temp = weatherData.main.temp;
			const weatherDescription = weatherData.weather[0].description;		
			const weatherIcon =  weatherData.weather[0].icon					// Obtains the weather icon from the JSON

			const iconUrl = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
			console.log("The temperature in " + cityName + " is: " + weatherData.main.temp);
			console.log("The current condition in " + cityName + " is " + weatherData.weather[0].description);

			// 
			res.write("<h1><u>Weather</u></h1>");
			res.write("<h2>The temperature in " + cityName + " is " + temp + " degrees Fahrenheit</h2>");
			res.write("<h3>The current condition in " + cityName + " is " + weatherDescription + ".</h3>");

			res.write("<img src="+ iconUrl + ">");		// Sends an image of the current condition
			res.send();
		})		
	})
	//console.log("Post request received");
}) 


app.listen(3000, function() {
	console.log("Server listening on port 3000. http://localhost:3000");
})