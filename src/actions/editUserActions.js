let { writeFile, readFile } = require("../helpers/helpers")

//metoda folosita in reqValidData pentru a verifica daca mailul deja exista
let checkMail = (newMail, allMails) => {
    for (let i = 0; i < allMails.length; i++) {
        if (newMail === allMails[i].email) return 1;
    }
    return 0;
};

//metoda verifica daca elementele introduse de user sunt corecte si corespund campului corespunzator
let reqValidData = (str, putMethod) => {
    //putMethod=1 daca aplicam metoda pe put
    //putMethod=0 daca apliam metodaspe patch
    let ok = "";
    let users = require("../../db/users.json");

    if (str.firstName) {
        if (!/^[a-zA-Z]+$/.test(str.firstName))
            ok += "Ati introdus prenumele gresit" + "\n";
    }
    else if (putMethod) {
        ok += "Nu ati introdus niciun prenume. \n"
    }

    if (str.lastName) {
        if (!/^[a-zA-Z]+$/.test(str.lastName))
            ok += "Ati introdus numele gresit" + "\n";
    }
    else if (putMethod) {
        ok += "Nu ati introdus niciun nume. \n"
    }

    if (str.email) {
        if (!/^([a-z0-9])+\@([a-z])+\.([a-z])+$/.test(str.email))
            ok += "Ati introdus emailul gresit" + "\n";

        if (checkMail(str.email, users) === 1) {
            ok += "Mailul folosit exista deja in baza de date";
        }
    }
    else if (putMethod) {
        ok += "Nu ati introdus niciun email \n"
    }

    if (str.phone) {
        if (!/^([0]{1})\d{5,9}$/.test(str.phone))
            ok += "Ati introdus gresit numarul de telefon";
    }
    else if (putMethod) {
        ok += "Nu ati introdus niciun numar de telefon \n"
    }

    return (ok === "") ? 1 : ok;
};


//returneaza linia unde se afla id-ul cautat 
//returneaza -1 daca nu gaseste id-ul
let idIdentification = (idNumb, arrOfObj) => {
    for (let i = 0; i < arrOfObj.length; i++) {
        if (arrOfObj[i].id === idNumb) {
            return i
        }
    }
    return -1;
}

let patchFct = (arr,newData,pos) => {
    (newData.firstName) ? arr[pos].firstName = newData.firstName :false;
    (newData.lastName) ? arr[pos].lastName = newData.lastName :false;
    (newData.email) ? arr[pos].email = newData.email :false;
    (newData.phone) ? arr[pos].phone = newData.phone :false;
}

let putFct = (arr,newData,pos) => {
    arr[pos].firstName = newData.firstName;
    arr[pos].lastName = newData.lastName;
    arr[pos].email = newData.email;
    arr[pos].phone = newData.phone;
}

const editUserPatch = (req, res) => {
    // let users = require("../../db/users.json");
    readFile("db/users.json")
        .then(data => {
            let users = JSON.parse(data)
            let id = idIdentification(Number(req.params.id), users);

            if (id === -1) {
                res.json({ "message": "Invalid ID" }).status(400)
            }
            else {
                let errMessage = reqValidData(req.body, 0);
                if (errMessage !== 1) {
                    res.json({ "err": errMessage }).status(400);
                }

                else {
                    patchFct(users,req.body,id);

                    writeFile("db/users.json", JSON.stringify(users)).then(() => {
                        res.send(users[id]).status(201)
                    })
                        .catch(error => {
                            res.status(500);
                            res.json({
                                serverErrorMessage: "the error was logged and we’ll be checking it shortly"
                            })
                        })
                }
            }
        })
        .catch(error => {
            res.status(500);
            res.json({
                serverErrorMessage: "the error was logged and we’ll be checking it shortly"
            })
        })
}

const editUserPut = (req, res) => {
    // let users = require("../../db/users.json");
    readFile("db/users.json")
        .then(data => {
            let users = JSON.parse(data)
            const id = Number(req.params.id)
            if (idIdentification(id, users) === -1) {
                res.json({ "message": "Invalid ID" }).status(400)
            }
            else {
                if (reqValidData(req.body, 1) === 1) {
                    let PositionOfID = idIdentification(id, users);
                    putFct(users,req.body,PositionOfID);
                   
                    writeFile("db/users.json", JSON.stringify(users)).then(() => {
                        res.send(users[PositionOfID]).status(201)
                    })
                        .catch(error => {
                            res.status(500);
                            res.json({
                                serverErrorMessage: "AICI !!!the error was logged and we’ll be checking it shortly"
                            })
                        })

                }
                else {
                    let errMessage = reqValidData(req.body, 1);
                    res.json({ "err": errMessage }).status(400)
                }
            }

        })
        .catch(error => {
            res.status(500);
            res.json({
                serverErrorMessage: "AICI 2! the error was logged and we’ll be checking it shortly"
            });
        });

}

module.exports = {
    checkMail,
    idIdentification,
    editUserPut,
    editUserPatch,
    reqValidData
}