const mysql = require("mysql");
const inquirer = require("inquirer");
const connection = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "Nicky0416!",
    database: "exercises"
});

//add exercises
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    mainMenu();
});

// main menu
function mainMenu() {
    inquirer
        .prompt({
            name: "menuOpt",
            type: "list",
            message: "Would you like to ADD or VIEW exercises?",
            choices: ["ADD", "VIEW", "EXIT"]
        })
        .then(function (answer) {
            // based on their answer, either call the bid or the post functions
            if (answer.menuOpt === "ADD") {
                addExer();
            }
            else if (answer.menuOpt === "VIEW") {
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
    inquirer.prompt([
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

    ])
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
