//jslint esversion: 6;
const express = require("express");
const request = require("request");
const https = require("https");

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));                  // Have to have this in order to send static files (pictures/stylesheets)
                                                            // "public" referes to the folder containing static files

app.use(express.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){
    const firstName = req.body.firstName;     // Have to give "name=" in html input first

    const lastName = req.body.lastName;
    const email = req.body.email;

    console.log(firstName);
    console.log(lastName);
    console.log(email);

    let data = {        // Making an objeect b/c Mailchimp api requires object
        members: [
            {
                email_address: email,
                email_type: "html",
                status: "subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data);        // Turns data above into json format
    
    const url = "https://us6.api.mailchimp.com/3.0/lists/b1305309d8";
    const options = {
        method: "POST",
        auth: "alankvuong:03b302e98341d68f6565ea0d2464d92b-us6"
    }

    const request = https.request(url, options, function(response){
        let statusCode = response.statusCode;
        console.log("Status Code: " + statusCode);
        if(statusCode === 200){
            res.send("Thank you for subscribing to my newsletter!");
        }
        else{
            res.send("You have encountered a " + statusCode + " error. Please try again later.");
        }

        if(statusCode === '200')
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();

});

app.listen(3000, function(){
    console.log("Server is running at port 3000. http://localhost:3000");
})

// Mailchimp API Key
// 03b302e98341d68f6565ea0d2464d92b-us6
// 03b302e98341d68f6565ea0d2464d92b-us6

// Audience/List ID
// b1305309d8