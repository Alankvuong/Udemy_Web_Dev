//jslint esversion: 6;
const express = require("express");
const request = require("request");
const https = require("https");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); // Have to have this in order to send static files (pictures/stylesheets)
// "public" referes to the folder containing static files

app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const firstName = req.body.firstName; // Have to give "name=" in html input first

  const lastName = req.body.lastName;
  const email = req.body.email;

  console.log(firstName);
  console.log(lastName);
  console.log(email);

  let data = {
    // Making an objeect b/c Mailchimp api requires object
    members: [
      {
        email_address: email,
        email_type: "html",
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data); // Turns data above into json format

  const url = "https://us6.api.mailchimp.com/3.0/lists/b1305309d8";
  const options = {
    method: "POST",
    auth: "alankvuong:be7d69fd8d8cda8024cd068710c73943-us6",
  };
  const request = https.request(url, options, function (response) {
    let statusCode = response.statusCode;
    console.log("Status Code: " + statusCode);

    if (statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();
});

app.post("/failure", function (req, res) {
  res.redirect("/");
  console.log("Hello");
});

app.listen(process.env.PORT || 3000, function () {
  console.log(
    "Server is running at port " +
      process.env.PORT +
      " OR 3000." +
      " http://localhost:3000 OR http://localhost:" +
      process.env.PORT
  );
});
