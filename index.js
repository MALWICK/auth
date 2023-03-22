const dotEnv = require("dotenv");
dotEnv.config();
const relate = require("./database/relationships");
relate();


const {loginWithEmailPassword} = require("./auth");



loginWithEmailPassword("jahmorant@gmail.com", "1234").then(user => console.log(user));
