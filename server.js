//Dependencies
var express = require("express");
// Allows us to run multiple "servers" if needed, boilerplate
var app = express();

var PORT = process.env.PORT || 3000;

//set up for data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//link to public directory for CSS/front end JS
app.use(express.static("public"));

//require the html routes function
require("./routes/htmlR")(app);

//run the server and log the port number to confirm it
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
