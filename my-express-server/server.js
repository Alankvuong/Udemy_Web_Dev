// jslint esversion:6

const express = require("express");
const app = express();

// --> / means to target the route(home) that we will respond to
app.get("/", function(req, res)     // req = request, res = response
{
    res.send("<h1>Hello World</h1>");
});

app.get("/contact", function(req, res)
{
    res.send("<a href='mailto:alan92840@live.com'>Contact me at alan92840@live.com</a>");
});

app.get("/about", function(req, res)
{
    res.send("<h1>About me!</h1><p>Hello</p>");
});

app.get("/hobbies", function(req, res)
{
    res.send("I like playing basketball and playing piano");
})

app.listen(3000, function(){
    console.log("Server started on server 3000");
});