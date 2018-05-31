let fs = require("fs");
const { readFile, writeFile, maxId } = require("../helpers/helpers");

let createUser = (req, res) => {
    readFile("db/users.json")
    .then(data => {
        const users = JSON.parse(data);
        let body = req.body;

        if (dataValid(body, users) !== 1) {
            res.status(400).json({ message: dataValid(body, users) });
        }
        else {
            body.id = maxId(users) + 1;
            users.push(body);

            writeFile("db/users.json", JSON.stringify(users))
            .then(() => {
                res.status(200).send(`/users/${body.id}`);
            })
            .catch(error => {
                res.status(500);
                res.json({
                    serverErrorMessage: "the error was logged and we’ll be checking it shortly"
                });
            })
        }
        
    })
    .catch(error => {
        res.status(500);
        res.json({
            serverErrorMessage: "the error was logged and we’ll be checking it shortly"
        });
    })
};

let dataValid = (body, users) => {
    let ok = "";
    if (!/^[a-zA-Z]+$/.test(body.firstName))
        ok += "Ati introdus prenumele gresit" + "\n";
    if (!/^[a-zA-Z]+$/.test(body.lastName))
        ok += "Ati introdus numele gresit" + "\n";
    if (!/^([a-z0-9A-Z])+\@([a-z0-9])+\.([a-z])+$/.test(body.email))
        ok += "Ati introdus emailul gresit" + "\n";
    if (!/^([0]{1})\d{5,9}$/.test(body.phone))
        ok += "Ati introdus gresit numarul de telefon";
    if (body.email.length > 0 && checkMail(body, users) === 1) {
        ok += "Mailul folosit exista deja in baza de date";
    }
    if (ok === "") return 1;
    else return ok;
};

let checkMail = (newMail, allMails) => {
    for (let i = 0; i < allMails.length; i++) {
        if (allMails[i].id !== newMail.id) {
            if (newMail.body === allMails[i].email) return 1;
        }
    }
    return 0;
};

module.exports = {
    createUser,
    dataValid,
    checkMail
};
