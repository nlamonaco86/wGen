// Dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const parts = require("./var")
const equip = require("./var")
const exerQ = require("./var")
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Nicky0416!",
    database: "exerdb"
});

// launch main menu on startup
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    mainMenu();
});

// main menu function
const mainMenu = () => {
    return inquirer.prompt([
        {
            name: "menuOpt",
            type: "list",
            message: "Welcome!",
            choices: ["GENERATE A WORKOUT", "VIEW EXERCISE DATABASE", "ADD TO EXERCISE DATABASE", "EDIT EXERCISE DATABASE", "EXIT"]
        }
    ])
        .then(response => {
            //switch case, because smoother than if/else
            switch (response.menuOpt) {
                case "GENERATE A WORKOUT":
                    return wGen();
                case "VIEW EXERCISE DATABASE":
                    return exerDB();
                case "ADD TO EXERCISE DATABASE":
                    return addExerQ();
                case "EDIT EXERCISE DATABASE":
                    return editExer();
                default:
                    connection.end();
            }
        });
}

function wGen() {
    console.log("GENERATE A WORKOUT")
    connection.end();
}

//View the exercise database and print it to the console
function exerDB() {
    connection.query("SELECT * FROM exercises", (err, results) => {
        if (err) throw error;
        results.forEach(row => {
            console.log(`${row.exerID} / ${row.exercise} / ${row.main} / ${row.aux1} / ${row.aux2} / ${row.mgroup} / ${row.UorL} / ${row.equip}`);
        });
        connection.end();
    })
}

// uses choices from a list and dataRecord variable to greatly shorten the code
const addExer = dataRecord => {
    connection.query("INSERT INTO exercises SET ?", dataRecord, (err, results) => {
        if (err) throw err;
        mainMenu();
    })
}
// ask the create auction questions
const addExerQ = () => {
    return inquirer.prompt(exerQ)
        .then(response => {
            addExer(response)
        });
}

//function to remove exercises from the database
const editExer = () => {
//selects the exercises and prints to console as a list of choices in an Inquirer checkbox   
    connection.query("SELECT * FROM exercises", (err, results) => {
        if(err) throw err;
        let choices = results.map( row => { 
            return {
                name: `${row.exerID} / ${row.exercise} / ${row.main} / ${row.aux1} / ${row.aux2} / ${row.mgroup} / ${row.UorL} / ${row.equip}`,
                value: row
            };
        });
        return inquirer.prompt([
            {
                message: "Select Exercise(s) to Delete:",
                name: "exer",
                choices: choices,
                type: "checkbox"
            }
        ]).then( response => {
            //*** DELETE FUNCTION GOES HERE ****
            response.exer.forEach(exer => console.log(exer.exerID))
            // console.log(response.exer[0].exerID)
            connection.end();
        });
    })
};