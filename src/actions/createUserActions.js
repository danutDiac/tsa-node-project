const userSchema = require("../models/userModels");

let createUser = (req, response) => {
  let user = req.body;
  dataValid(user)
    .then(saveUserToDb)
    .then((user)=>{
      user.id = idMax().then((data)=>data);
      user.links = {
        "GET" : `localhost:3000/users/${user.id}`,
        "DELETE": `localhost:3000/users/${user.id}`
      }
      response.status(200).send(user)
    }) 
    .catch(err => {
      if (/email_1/.test(err.message))
        response
          .status(400)
          .send({ message: "Adresa de e-mail deja exista in baza de date" });
      else response.status(400).send(err);
    });
};

let dataValid = body => {
  return new Promise((res, rej) => {
    let ok = "";
    if (!/^[a-zA-Z]+$/.test(body.firstName))
      ok += "Ati introdus prenumele gresit;";
    if (!/^[a-zA-Z]+$/.test(body.lastName))
      ok += "Ati introdus numele gresit;";
    if (!/^([a-z0-9A-Z])+\@([a-z0-9])+\.([a-z])+$/.test(body.email))
      ok += "Ati introdus emailul gresit;";
    if (!/^([0]{1})\d{5,9}$/.test(body.phone))
      ok += "Ati introdus gresit numarul de telefon";
    if (ok === "") {
      res(body);
    } else rej({ message: ok });
  });
};


let idMax = () => {
  return new Promise ((res,rej)=>{
  userSchema.find({}, (err, users) => {
    res(users.length);
  })
}
)}

console.log(idMax().then(data=>data))

let saveUserToDb = body => {
  return new Promise((res,rej)=>{
  let newUser = new userSchema(body);
  newUser.save((err, data) => {if (err) {rej(err)} else {res(body)}});
})
};

if (process.env.NODE_ENV == "dev") {
  module.exports = {
    createUser,
    dataValid
  };
} else {
  module.exports = {
    createUser
  };
}
