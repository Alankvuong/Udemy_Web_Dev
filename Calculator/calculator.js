const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(express.urlencoded({extended : true}));			// Extended = true allows us to post
														// Body parser is deprecated, use express instead
															// Used to get form data

app.get('/', function(req, res){
	res.sendFile(__dirname + "/index.html");
});

app.post('/', function(req, res){
	console.log(req.body.num2);

	var num1 = Number(req.body.num1);				// Number converts string to number
	var num2 = Number(req.body.num2);

	var result = num1 + num2;						// Adding the two nums together and stores in result
	res.send("The sum of the two numbers is: " + result);
});

// Gets the data from route
app.get("/bmicalculator", function(req, res){
	res.sendFile(__dirname + "/bmiCalculator.html");
});

// Allows to post data to /bmicalculator route
app.post("/bmicalculator", function(req, res){
	var weight = parseFloat(req.body.weight);			// Converts string weight to float
	var height = parseFloat(req.body.height);			// Converts string height to float

	console.log("Weight: " + weight);

	var bmi = weight / (height * height) * 703;			// Calculates the bmi

	console.log("Height: " + height);
	console.log("BMI: " + bmi);

	res.send("Your BMI is " + bmi);						// Sends the calculated bmi to server
});

app.listen(3000, function()
{
	console.log("Server started on port 3000. localhost:3000");
});