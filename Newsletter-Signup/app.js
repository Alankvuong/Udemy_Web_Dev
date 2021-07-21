//jslint esversion: 6;
const express = require("express");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.send("<p>Hello World</p>");
})

app.post("/", function(req, res){
    res.send("<h1>Hello</h1>");
})

app.listen(3000, function(){
    console.log("Server is running at port 3000. http://localhost:3000");
})