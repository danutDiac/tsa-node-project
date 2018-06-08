let fs = require('fs')
let mongoose = require('mongoose')
let express = require("express");
let bodyParser = require("body-parser")
let morgan = require("morgan")
let moment = require('moment-timezone');
let usersRouter = require("./routes/users");
let daysRouter = require("./routes/days");
let nationalDaysRouter = require("./routes/nationalDays");
let config = require("../config/config");

let app = express();

morgan.token('date', (req, res, tz) => moment().tz(tz).format())
morgan.token('res', (req, res, field) => res[field])
morgan.token('req', (req, res, field) => JSON.stringify(req[field], null, 2))
morgan.format('dataFormat', '[:date[Europe/Bucharest]] :method ":url" :status :res[statusMessage] - :req[body]')
const stream = fs.createWriteStream('logs/errors.log', { flags: 'a' })
const skip = (req, res) => res.statusCode < 400
app.use(morgan('dataFormat', { skip, stream }))
app.use(bodyParser.json());
app.use("/days", daysRouter);
app.use("/users", usersRouter);
app.use("/nationalDays", nationalDaysRouter);
mongoose.connect(config.mongoUrl, (err, res) => {
    if (err) console.log(err)
    else console.log("Connected to db")
});

app.listen(3000, function () {
    console.log('Server started on localhost:3000')
});

module.exports = app;
