//Dependencies
var express = require("express");
// Allows us to run multiple "servers" if needed, boilerplate
var app = express();
var exphbs = require("express-handlebars");
var mysql = require("mysql");

var PORT = process.env.PORT || 3000;

//set up for data parsing
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Nicky0416!",
  database: "exerdb"
});

//render homepage with all exercises (for testing purposes)
app.get("/", function(req, res) {
  connection.query("SELECT * FROM exercises;", function(err, data) {
    if (err) {
      return res.status(500).end();
    }

    res.render("index", { exercises: data });
  });
});
//require the html routes function
// require("./routes/htmlR")(app);

//run the server and log the port number to confirm it
app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});
