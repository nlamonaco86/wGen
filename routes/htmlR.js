// dependencies 
const path = require("path");

module.exports = (app) => {
    // route to the index on load
    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "../views/index.html"));
    });
    // route to given workout split 
    // can't this be parametized???
    app.get("/workout", (req, res) => {
        res.sendFile(path.join(__dirname, "../views/workout.html"));
    });

};