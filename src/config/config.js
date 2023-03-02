const {config} = require('dotenv');
config();


module.exports = {
    PORT: process.env.PORT || 1337,
    passwordDB: process.env.PASSWORDSQL,
    serverName: process.env.SERVERNAME,
    userServer:  process.env.USERSQL,
    databaseName: process.env.DBNAME,
    passwordEmail: process.env.PASSWORDMAIL
}