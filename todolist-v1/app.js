//jslint esversion: 6;
const express = require("express");

const app = express();

app.use('view engine', 'ejs');

app.get("/", function(req, res){

	var today = new Date();
	var currentDay = today.getDay();

	if (currentDay === 6 || currentDay === 0) {
		res.sendFile(__dirname + "/weekend.html");

	} else {
		res.sendFile(__dirname + "/weekday.html");
	}
});

app.listen(process.env.PORT || 3000, function () {
	console.log("Server is running at port 3000. http://localhost:3000");
  });