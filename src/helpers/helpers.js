const fs = require("fs");

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

const getJSONFromFile = path => {
    return readFile(path)
        .then(data => JSON.parse(data))
        .then(p => {
            return p;
        });
};

const maxId = array => {
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

module.exports = {
    writeFile,
    readFile,
    parseJSON,
    maxId,
    newId,
    findItemById,
    getJSONFromFile
};
