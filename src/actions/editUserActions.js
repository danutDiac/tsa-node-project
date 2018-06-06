let { writeFile, readFile } = require("../helpers/helpers")
let { dataPATCH, dataPUT } = require('../userUtilities/editUserFuncs')
let { checkMail, reqValidData, idIdentification } = require('../userUtilities/userPrivateFuncs')

const editUserPatch = (req, res) => {
    // let users = require("../../db/users.json");
    readFile("db/users.json")
        .then((data) => dataPATCH(req, res, data))
        .catch(error => {
            res.status(500);
            res.json({"Message": "error has logged"});
        })
}

const editUserPut = (req, res) => {
    // let users = require("../../db/users.json");
    readFile("db/users.json")
        .then((data) => dataPUT(req, res, data))
        .catch(error =>{
            console.log(error);
            res.status(500);
            res.json({"message": "the error has logged"});
        })

}

module.exports = {
    editUserPut,
    editUserPatch  
}