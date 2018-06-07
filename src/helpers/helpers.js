const fs = require("fs");

const writeFile = (path, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, data, error => {
            if (error) reject(error);
            else resolve();
        });
    });
};

// const writeFile = (path, data) => new Promise((resolve, reject) => {
//     fs.writeFile(path, data, err => {
//         err ? reject(err) : resolve()
//     })
// })

const readFile = path => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (error, data) => {
            if (error) reject(error);
            else resolve(data);
        });
    });
};

// const readFile = path => new Promise((resolve, reject) => {
//     fs.readFile(path, (err, data) => {
//         err ? reject(err) : resolve(data)
//     })
// })

const parseJSON = data => {
    return new Promise((resolve, reject) => {
        try {
            resolve(JSON.parse(data));
        } catch (error) {
            reject(error);
        }
    });
};

const maxId = (array) => {
    if (array.length === 0) return 0;
    return array[array.length - 1].id;
};

// const maxId = array => array.length === 0 ? 0 : array[array.length - 1].id

const newId = array => {
    if (array.length === 0) return 0;
    return array[array.length - 1].id + 1;
};

// const newId = array => array.length === 0 ? 0 : array[array.length - 1].id + 1

const findItemById = (array, id) => {
    return array.find(item => item.id === id);
};

// const findItemById = (array, id) => array.find(item => item.id === id)

let sendErrorMessage = ({err, res}) => {
    return res.status(500).json({
        serverErrorMessage: "the error was logged and we’ll be checking it shortly"
    })
}

let sendSuccessMessage = (status, body, res) => {
    
    return res.status(status).json(body)
}

module.exports = {
    writeFile,
    readFile,
    parseJSON,
    maxId,
    newId,
    findItemById,
    sendErrorMessage,
    sendSuccessMessage
}