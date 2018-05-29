let express = require("express");
let bodyParser = require("body-parser")
let usersRouter = require("./routes/users");
let daysRouter = require("./routes/days");

let app = express();
app.use(bodyParser.json());
app.use("/days", daysRouter);
app.use("/users", usersRouter);

app.listen(3000);
