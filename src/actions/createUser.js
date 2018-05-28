let fs = require("fs");
let users = require("../../db/users.json")

let createUser = (req, res) => {
  let name = req.body;
  if (dataValid(name) === 1) {
    name.userId = idMax(users)+1;
    users.push(name);
    fs.writeFile("db/users.json", JSON.stringify(users), err => {
      if (err) throw err(console.log("Nu s-a putut suprascrie"));
    });
    res.status(200).send(`/users/${name.userId}`);
  } else {
    res.status(400).json({ message: dataValid(name) });
  }
};
let dataValid = (str) => {
  let ok = "";
  if (!/^[a-zA-Z]+$/.test(str.firstName))
    ok += "Ati introdus prenumele gresit" + "\n";
  if (!/^[a-zA-Z]+$/.test(str.lastName))
    ok += "Ati introdus numele gresit" + "\n";
  if (!/^([a-z0-9A-Z])+\@([a-z0-9])+\.([a-z])+$/.test(str.email))
    ok += "Ati introdus emailul gresit" + "\n";
  if (!/^([0]{1})\d{5,9}$/.test(str.phone))
    ok += "Ati introdus gresit numarul de telefon";
  if (str.email.length>0 && checkMail(str.email, users) === 1) {
    ok+= "Mailul folosit exista deja in baza de date";
  }
  if (ok === "") return 1;
  else return ok;
};

let idMax = (users) => {
  let max=0;
  for (let i=0;i<users.length;i++)
      {
        if (users[i].userId>max)
          max=users[i].userId;
      }
  return max;
}

let checkMail = (newMail, allMails) => {
  for (let i=0; i<allMails.length; i++){
    if (newMail === allMails[i].email)
       return 1;
  } 
  return 0;
} 

module.exports = {
  createUser,
  idMax,
  dataValid,
  checkMail
};
