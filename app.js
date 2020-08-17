// Dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const parts = require("./var")
const equip = require("./var")
const exerQ = require("./var")
const genQ = require("./var")
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
                    return wGenQ();
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
const addExer = exerRecord => {
    connection.query("INSERT INTO exercises SET ?", exerRecord, (err, results) => {
        if (err) throw err;
        mainMenu();
    })
}
// ask the create exercise questions
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
                name: `${row.exerID} | ${row.exercise} | ${row.main} | ${row.aux1} | ${row.aux2} | ${row.mgroup} | ${row.UorL} | ${row.equip}`,
                value: row
            };
        });
        return inquirer.prompt([
            {
                message: "Select Exercise(s) to Delete:",
                name: "exer",
                choices,
                type: "checkbox"
            }
        ]).then( response => {
            // store targeted items in this empty array
            const target = []
            // push to the empty array
            response.exer.forEach(exer => target.push(exer.exerID))
            // delete the selected exercises * why does this only delete 1 even when multiple selected? *
            connection.query("DELETE FROM exercises WHERE exerID = ?", target, (err, results) => {
                if (err) throw err;
            });
            mainMenu();
        });
    })
};

const wGenQ = () => {
    return inquirer.prompt(genQ)
        .then(response => {
            wGen(response)
        });
}

const wGen = genRec => {
    // console.log(genRec)
    switch (genRec.split) {
        case "Arnold":
            return console.log("arnie");
        case "Push / Pull / Legs":
            return console.log("ppl");
        case "Bro-Split":
            return console.log("bro bro bro");
        default:
            mainMenu();
    }
}

// Need 3 functions, one for each split
// OR do we need 1 good function that can do all three (probably this...it's usually this)
//     // get the user's name
//     // get their e-mail address
//     // give the user a choice of workout splits
//     // ask about desired volume level
//     // see what equipment they have available
//     // create a single week's workout based on that split and equipment
//     // print it to the console and/or e-mail it to them
