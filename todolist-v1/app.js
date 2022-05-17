//jslint esversion: 6;
const express = require("express");
const https = require("https");
const bodyParser = require('body-parser');

const date = require(__dirname + "/date.js");	// Requiring local module

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


var itemsArray = ["Buy food", "Cook Food", "Eat food"];		// Array with predefined todo list items
var workList = [];

app.get("/", function(req, res){
	let day = date.getDate();		// Calling function getDate() using date module

	// Passes in two variables: one for day, one for items
	res.render("list", {listTitle: day, newListItems: itemsArray});
});

app.get("/work", function(req, res) {
	res.render("list", {listTitle: "Work List", newListItems: workList})
});

app.get("/about", function(req, res) {
	res.render("about");
});

// POST REQUEST: Gets new user input upon Add Button pressed
app.post("/", function(req, res) {
	var item = req.body.newItem;		// Grabs the new item that was requested
	if(req.body.list == "Work") {
		workList.push(item);
		res.redirect("/work");
	} else {
		itemsArray.push(item);		// Places the item into an item array
	
		res.redirect("/");		// Redirects to the home page
	}
});

app.post("/work", function(req, res) {
	let item = req.body.newItem;
	workList.push(item);

	res.redirect("/work");
})

app.listen(3000, function () {
	console.log("Server is running at port 3000. http://localhost:3000");
});
