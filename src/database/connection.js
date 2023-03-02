const sql = require('mysql')
const config = require('../config/config')

const dbSetting = {
    user: config.userServer,
    password: config.passwordDB,
    host: config.serverName,
    database: config.databaseName,
}

const connection = sql.createConnection(dbSetting)

connection.connect(function (e) {
    if (e) {
        throw e;
    } else {
        console.log('Database connected')
    }
})

module.exports = connection

