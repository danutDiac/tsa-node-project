if (process.env.NODE_ENV == "dev") {
    module.exports = {"mongoUrl": "mongodb://localhost:27017/tsa-db-test"}
} else {
    module.exports = {"mongoUrl": "mongodb://localhost:27017/tsa-db"}
}