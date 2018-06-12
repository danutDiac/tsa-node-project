if (process.env.NODE_ENV == 'dev') {
    module.exports = {
        mongoUrl: 'mongodb://localhost:27017/tsa-db-test'
    }
} else {
    module.exports = {
        mongoUrl: process.env.mongoUrl || 'mongodb://localhost:27017/tsa-db'
    }
}