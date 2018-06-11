const { readFile, writeFile, maxId } = require("../helpers/helpers");
const userSchema = require("../models/userModels");

let createUser = (req,res)=>{
  let user = req.body;
  dataValid(user).then(saveUserToDb).catch((err)=>
{
  
});
}

let dataValid = (body) => {
  return new Promise((res,rej)=>{
  let ok = "";
  if (!/^[a-zA-Z]+$/.test(body.firstName))
    ok += "Ati introdus prenumele gresit" + "\n";
  if (!/^[a-zA-Z]+$/.test(body.lastName))
    ok += "Ati introdus numele gresit" + "\n";
  if (!/^([a-z0-9A-Z])+\@([a-z0-9])+\.([a-z])+$/.test(body.email))
    ok += "Ati introdus emailul gresit" + "\n";
  if (!/^([0]{1})\d{5,9}$/.test(body.phone))
    ok += "Ati introdus gresit numarul de telefon";
  if (ok === "") 
    res(body);
    else
    rej(ok);
  });
}

let saveUserToDb = (body) => {
  let newUser = new userSchema(body)
    newUser.save((err, data) => {
      if (err) 
      console.log("Eroarea este",err);
       else 
      sendSuccessMessage(200, data, res)
    })
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
