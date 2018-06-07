const { readFile } = require("../helpers/helpers");

let retrieveUsers = (req, res) => {
  readFile("db/users.json")
    .then(data => {
      let users = JSON.parse(data);
      if (users) {
        res.status(200).json(users);
      } else {
        res.status(404).json({
          serverErrorMessage: "User not found"
        });
      }
    })
    .catch(error => {
      res.status(500);
      res.json({
        serverErrorMessage:
          "the error was logged and we’ll be checking it shortly"
      });
    });
};

module.exports = { retrieveUsers };
