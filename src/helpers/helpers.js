const fs = require("fs");

const writeFile = (path, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, data, error => {
            if (error) reject(error);
            else resolve();
        });
    });
}

const readFile = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (error, data) => {
            if (error) reject(error);
            else resolve(data);
        })
    })
}

const maxId = (array) => {
    if (array.length === 0) return 0;
    return array[array.length - 1].id;
}

const newId = (array) => {
    if (array.length === 0) return 0;
    return array[array.length - 1].id + 1;
}

const findItemById = (array, id) => {
    return array.find(item => item.id === id);
}

module.exports = {
    writeFile,
    readFile,
    maxId,
    newId,
    findItemById
}