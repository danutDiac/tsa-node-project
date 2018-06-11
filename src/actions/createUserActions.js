const { readFile, writeFile, maxId } = require("../helpers/helpers");
const userSchema = require("../models/userModels");

let createUser = (req, res) => {
  let user = req.body;
  dataValid(user)
    .then(saveUserToDb)
    .catch(err => {
      res.send({
        status: 404,
        message: err
      });
    });
};

let dataValid = body => {
  return new Promise((res, rej) => {
    let ok = "";
    if (!/^[a-zA-Z]+$/.test(body.firstName))
      ok += "Ati introdus prenumele gresit" + "\n";
    if (!/^[a-zA-Z]+$/.test(body.lastName))
      ok += "Ati introdus numele gresit" + "\n";
    if (!/^([a-z0-9A-Z])+\@([a-z0-9])+\.([a-z])+$/.test(body.email))
      ok += "Ati introdus emailul gresit" + "\n";
    if (!/^([0]{1})\d{5,9}$/.test(body.phone))
      ok += "Ati introdus gresit numarul de telefon";
    if (ok === "") {
      body.links = {
        GET: `http://localhost:3000/users/${Number(body.id)}`,
        DELETE: `http://localhost:3000/users/${Number(body.id)}`
      };
      res(body);
    } else
      rej({'message:': ok});
  });
};

let saveUserToDb = body => {
  return new Promise((res, rej) => {
    let newUser = new userSchema(body);
    newUser.save((err, data) => {
      if (err) {
        rej(err);
      } else {
        response.status(200).send(user);
        resolve();
      }
    });
  });
};

if (process.env.NODE_ENV == "dev") {
  module.exports = {
    createUser,
    dataValid,
    checkMail
  };
} else {
  module.exports = {
    createUser
  };
}
