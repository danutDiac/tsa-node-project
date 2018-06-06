let { writeFile, readFile, parseJSON } = require("../helpers/helpers")
let { checkMail, reqValidData, getIdIndex, replacePATCH, replacePUT } = require("./userPrivateFuncs")

let dataPATCH = (req, res, data) => {

    const body = req["body"];
    const id = Number(req["params"].id)

    return parseJSON(data)
        .then(users =>
            reqValidData(body, users, 0)
                .then(getIdIndex.bind(null, id, users))
                .then(line => replacePATCH(body, users, line)
                    .then(writeFile.bind(null, "db/users.json", JSON.stringify(users)))
                    .then(() => res.status(201).json(users[line])))
        )
        .catch(err => {
            console.log(err)
            res.status(err["status"]).json({ "message": err["message"] })
        })
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
                    .then(() => res.status(201).json(users[line])))
        )
        .catch(err => {
            console.log(err)
            res.status(err["status"]).json({ "message": err["message"] })
        })
}


module.exports = { dataPATCH, dataPUT }