let fs = require("fs");

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
    //putMethod=0 daca apliam metoda pe patch
    let ok = "";
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
        ok += ok += "Nu ati introdus niciun nume. \n"
    }

    if (str.email) {
        if (!/^([a-z0-9])+\@([a-z])+\.([a-z])+$/.test(str.email))
            ok += "Ati introdus emailul gresit" + "\n";
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
        if(arrOfObj[i].id === idNumb){
            return i
        }
    }
    return -1;
}

const editUserPatch = (req, res) => {
    let users = require("../../db/users.json");

    
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
            (req.body.firstName) ? users[id].firstName = req.body.firstName : false;
            (req.body.lastName) ? users[id].lastName = req.body.lastName : false;
            (req.body.email) ? users[id].email = req.body.email : false;
            (req.body.phone) ? users[id].phone = req.body.phone : false;
            res.send(users[id])
        }
    }
}


const editUserPut = (req, res) => {
    let users = require("../../db/users.json");
    const id = Number(req.params.id)
    if (idIdentification(id, users) === -1) {
        res.json({ "message": "Invalid ID" }).status(400)
    }
    else {
        if (reqValidData(req.body, 1) === 1) {
            let PositionOfID = idIdentification(id, users);
            users[PositionOfID].firstName = req.body.firstName;
            users[PositionOfID].lastName = req.body.lastName;
            users[PositionOfID].email = req.body.email;
            users[PositionOfID].phone = req.body.phone;
            res.send(users[PositionOfID])
        }
        else {
            let errMessage = reqValidData(req.body, 1);
            res.json({ "err": errMessage }).status(400)
        }
    }

}

module.exports = {
    editUserPut,
    editUserPatch
}