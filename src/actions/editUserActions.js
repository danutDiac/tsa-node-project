let { writeFile, readFile, parseJSON } = require("../helpers/helpers")

let dataPATCH = (req, res, data) => {

    const body = req["body"];
    const id = Number(req["params"].id)

    return parseJSON(data)
        .then(users =>
            reqValidData(body, users, 0)
                .then(getIdIndex.bind(null, id, users))
                .then(line => replacePATCH(body, users, line)
                    .then(writeFile.bind(null, "db/users.json", JSON.stringify(users)))
                    .then(() => res.status(201).json({
                        "users": users[line],
                        "links": {
                            "GET": req.headers.host + req.originalUrl,
                            "PUT": req.headers.host + req.originalUrl,
                            "DELETE": req.headers.host + req.originalUrl,
                            "POST": req.headers.host + req.baseUrl
                        }
                    })
                    )
                )
                .catch(err => {
                    console.log(err)
                    res.status(err["status"]).json({ "message": err["message"] })
                })
        )
}

let dataPUT = (req, res, data) => {

    const body = req["body"];
    const id = Number(req["params"].id)

    return parseJSON(data)
        .then(users =>
            reqValidData(body, users, 1)
                .then(getIdIndex.bind(null, id, users))
                .then(line => replacePUT(body, users, line)
                    .then(writeFile.bind(null, "db/users.json", JSON.stringify(users)))
                    .then(() => res.status(201).json({
                        "users": users[line],
                        "links": {
                            "GET": req.headers.host + req.originalUrl,
                            "PUT": req.headers.host + req.originalUrl,
                            "DELETE": req.headers.host + req.originalUrl,
                            "POST": req.headers.host + req.baseUrl
                        }
                    })))
        )
        .catch(err => {
            console.log(err)
            res.status(err["status"]).json({ "message": err["message"] })
        })
}


let checkMail = (newMail, allMails) => {
    for (let i = 0; i < allMails.length; i++) {
        if (newMail === allMails[i].email) return 1;
    }
    return 0;
};

let reqValidData = (body, users, putMethod) => {
    //putMethod=1 daca aplicam metoda pe put
    //putMethod=0 daca apliam metodaspe patch
    return new Promise((resolve, reject) => {

        let ok = "";
        if (body.firstName) {
            if (!/^[a-zA-Z]+$/.test(body.firstName))
                ok += "Ati introdus prenumele gresit" + "\n";
        }
        else if (putMethod) {
            ok += "Nu ati introdus niciun prenume. \n"
        }

        if (body.lastName) {
            if (!/^[a-zA-Z]+$/.test(body.lastName))
                ok += "Ati introdus numele gresit" + "\n";
        }
        else if (putMethod) {
            ok += "Nu ati introdus niciun nume. \n"
        }

        if (body.email) {
            if (!/^([a-z0-9])+\@([a-z])+\.([a-z])+$/.test(body.email))
                ok += "Ati introdus emailul gresit" + "\n";

            if (checkMail(body.email, users) === 1) {
                ok += "Mailul folosit exista deja in baza de date";
            }
        }
        else if (putMethod) {
            ok += "Nu ati introdus niciun email \n"
        }

        if (body.phone) {
            if (!/^([0]{1})\d{5,9}$/.test(body.phone))
                ok += "Ati introdus gresit numarul de telefon";
        }
        else if (putMethod) {
            ok += "Nu ati introdus niciun numar de telefon \n"
        }

        if (ok === "") {
            resolve();
        }

        else {
            reject({
                "status": 400,
                "message": ok
            })
        }
    })
};

let getIdIndex = (idNumb, arrOfObj) => {
    return new Promise((resolve, reject) => {

        const line = arrOfObj.findIndex(item => item.id === idNumb)
        if (line !== -1) {
            resolve(line);
        }
        else {
            reject({
                "status": 400,
                "message": "Invalid ID"
            })

        }

    })
};

let replacePATCH = (body, users, line) => {
    return new Promise((resolve, reject) => {

        (body.firstName) ? users[line].firstName = body.firstName : false;
        (body.lastName) ? users[line].lastName = body.lastName : false;
        (body.email) ? users[line].email = body.email : false;
        (body.phone) ? users[line].phone = body.phone : false;
        resolve();

    })
};

let replacePUT = (body, users, line) => {
    return new Promise((resolve, reject) => {

        users[line].firstName = body.firstName;
        users[line].lastName = body.lastName;
        users[line].email = body.email;
        users[line].phone = body.phone;
        resolve();

    })
}


const editUserPatch = (req, res) => {
    // let users = require("../../db/users.json");
    readFile("db/users.json")
        .then((data) => dataPATCH(req, res, data))
        .catch(error => {
            res.status(500);
            res.json({ "Message": "PATCH ERROR: error has logged" });
        })
}

const editUserPut = (req, res) => {
    // let users = require("../../db/users.json");
    readFile("db/users.json")
        .then((data) => dataPUT(req, res, data))
        .catch(error => {
            console.log(error);
            res.status(500);
            res.json({ "message": "PUT ERROR: the error has logged" });
        })

}
if (process.env.NODE_ENV == "dev") {
    module.exports = {
        editUserPut,
        editUserPatch,
        dataPATCH,
        dataPUT,
        checkMail,
        reqValidData,
        getIdIndex,
        replacePATCH,
        replacePUT
    }
}
else {
    module.exports = {
        editUserPatch,
        editUserPut
    }
}