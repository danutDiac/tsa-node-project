let express = require("express");
let bodyParser = require("body-parser")
let usersRouter = require("./routes/users");
let daysRouter = require("./routes/days");
let exampleRouter = require("./routes/example");

let app = express();
app.use(bodyParser.json());
app.use("/days", daysRouter);
app.use("/users", usersRouter);
app.use("/api", exampleRouter);

app.listen(3000,function(){
    console.log('Server started on localhost:3000')
});

module.exports = app