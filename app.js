// Dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const connection = mysql.createConnection({
    host: "localhost",
    // port
    port: 3306,
    // username
    user: "root",
    // password
    password: "Nicky0416!",
    // database
    database: "exercises"
});

// launch main menu on startup
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    mainMenu();
});

// main menu function
const mainMenu = function () {
    inquirer.prompt({
            name: "menuOpt",
            type: "list",
            message: "Welcome!",
            choices: ["GENERATE A WORKOUT", "GO TO EXERCISE DATABASE", "EXIT"]
        })
        .then(function (answer) {
            if (answer.menuOpt === "GENERATE A WORKOUT") {
                wGen();
            }
            else if (answer.menuOpt === "GO TO EXERCISE DATABASE") {
                exerDB();
            } 
            else {
                connection.end();
            }
        });
}

// exercise database manager menu
const exerDB = function () {
    inquirer.prompt([{
            name: "menuOpt",
            type: "list",
            message: "Would you like to ADD or VIEW exercises?",
            choices: ["ADD", "VIEW", "EXIT"]
        },
        {
            name: "group",
            type: "list",
            message: "Which Group?",
            choices: ["UPPER", "LOWER"]
        }])
        .then(function (answer) {
            // based on their answer, either call the bid or the post functions
            if (answer.menuOpt === "ADD") {
                addExer();
            }
            else if (answer.menuOpt === "VIEW") {
                // parametize this query
                connection.query("SELECT * FROM upper", (err, results) => {
                    if (err) throw error;
                    results.forEach(row => {
                        console.log(`${row.exerID} / ${row.exercise} / ${row.main} / ${row.aux1} / ${row.aux2}`);
                    });
                    connection.end();
                })
            } 
            else {
                connection.end();
            }
        });
}

// add exercise function
const addExer = function () {
    inquirer.prompt(exerQ)
        .then(function (response) {
            var query = connection.query(
                "INSERT INTO upper SET ?",
                {
                    exercise: response.exercise,
                    main: response.main,
                    aux1: response.aux1,
                    aux2: response.aux2
                },
                function (err, res) {
                    if (response.another) {
                        addExer();
                    }
                    if (err) throw err;
                    else {
                        console.log(res.affectedRows + " exercise inserted!\n")
                        console.log(query.sql);
                    }
                }

            );
        })
}

// questions array, make code look cleaner
const exerQ = [
    {
        type: "input",
        message: "Exercise Name?",
        name: "exercise",
    },
    {
        type: "input",
        message: "Main?",
        name: "main",
    },
    {
        type: "input",
        message: "Aux 1?",
        name: "aux1",
    },
    {
        type: "input",
        message: "Aux 2?",
        name: "aux2",
    },
    {
        type: "confirm",
        message: "Add another Exercise?",
        name: "another",
    }
]