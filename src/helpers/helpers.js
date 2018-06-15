const fs = require("fs");
const User = require("../models/userModel");

const writeFile = (path, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, data, error => {
            if (error) reject(error);
            else resolve();
        });
    });
};

const readFile = path => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (error, data) => {
            if (error) reject(error);
            else resolve(data);
        });
    });
};

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

const newId = array => {
    if (array.length === 0) return 0;
    return array[array.length - 1].id + 1;
};


const findItemById = (array, id) => {
    return array.find(item => item.id === id);
};

const findItemByUserId = (array, id) => {
    return array.filter(item => item.userId === id);
}

const getUserFromDB = userId => {
    return new Promise((resolve, reject) => {
        let findUser = User.findById(userId, (err, user) => {
            if (err) {
                reject({
                    status: 400,
                    message: "Bad user id"
                });
                return
            }
            if (user) resolve(user);
            reject({
                status: 404,
                message: "User not found"
            });
        });
    });
};

const checkUserExistsInDB = userId => {
    getUserFromDB(userId)
    .then(() => {
        return;
    })
}

module.exports = {
    writeFile,
    readFile,
    parseJSON,
    maxId,
    newId,
    findItemById,
    getUserFromDB,
    checkUserExistsInDB
}