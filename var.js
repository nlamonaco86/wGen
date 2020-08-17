// storing arrays in this variable to make the main code look much more clean

const parts = ["Chest", "Back", "Bicep", "Tricep", "Front Delt", "Side Delt", "Rear Delt", "Forearm", "Trap", "Core", "Quad", "Ham", "Glute", "Calf", "None"]

const equipment = ["Barbell", "Dumbbell", "Machine", "Bodyweight", "Kettlebell", "Bands"]

const split = ["Push / Pull / Legs", "Arnold", "Bro-Split"]

const exerQ = [{
    type: "input",
    message: "Exercise Name?",
    name: "exercise",
}, {
    type: "list",
    message: "Group?",
    choices: ["Upper", "Lower"],
    name: "mgroup",
}, {
    type: "list",
    message: "Push or Pull?",
    choices: ["Push", "Pull"],
    name: "UorL",
}, {
    type: "list",
    message: "Main?",
    choices: parts,
    name: "main",
}, {
    type: "list",
    message: "Aux?",
    choices: parts,
    name: "aux1",
},
{
    type: "list",
    message: "Aux 2?",
    choices: parts,
    name: "aux2",
}, {
    type: "list",
    message: "Equipment Required?",
    choices: equipment,
    name: "equip",
},]

const genQ = [{
    type: "input",
    message: "What's your Name?",
    name: "name",
}, {
    type: "input",
    message: "Enter Your E-Mail:",
    name: "email",
}, {
    type: "list",
    message: "Choose a Split:",
    choices: split,
    name: "split",
},
{
    type: "list",
    message: "Choose a Volume Level:",
    choices: ["Low", "Medium", "High"],
    name: "volume",
},
{
    type: "checkbox",
    message: "Select the Equipment You Have Acces To:",
    choices: equipment,
    name: "access",
}]

module.exports = parts
module.exports = equipment
module.exports = exerQ
module.exports = genQ
