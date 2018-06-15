const userSchema = require("../models/userModels");
const mongoose=require('mongoose');


let retrieveUsers=(req,res)=>{
var User= ()=> {return new Promise((resolve,reject)=>{
  let user=userSchema.find(({}, function(err, users) {
    var userMap = [];
    users.map(e => userMap.push(e));
    resolve(userMap);
  }))
})}
User().then((userMap)=>{res.send(userMap)}).catch(( err=>{
  res.status(400).json({
    ErrorMessage :"Bad Request Error"
  })
}))
}

module.exports = { retrieveUsers };