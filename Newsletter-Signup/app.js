//jslint esversion: 6;
const express = require("express");
const request = require("request");
const https = require("https");

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.use(express.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){
    let firstName = req.body.firstName;     // Have to give "name=" in html input first
    console.log(firstName);

    let lastName = req.body.lastName;
    console.log(lastName);

    let email = req.body.email;
    console.log(email);
})

app.listen(3000, function(){
    console.log("Server is running at port 3000. http://localhost:3000");
})