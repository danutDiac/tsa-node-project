let fs = require('fs')
let express = require("express");
let bodyParser = require("body-parser")
let morgan = require('morgan')
let usersRouter = require("./routes/users");
let daysRouter = require("./routes/days");
let exampleRouter = require("./routes/example");

let app = express();
app.use(bodyParser.json());
app.use("/days", daysRouter);
app.use("/users", usersRouter);
app.use("/api", exampleRouter);
app.use(morgan('[:date[clf]] :method ":url" :status', {
    skip: (req, res) => res.statusCode < 400,
    stream: fs.createWriteStream('logs/errors.log', { flags: 'a' })
}))

app.listen(3000, function () {
    console.log('Server started on localhost:3000')
});

module.exports = app