const connection = require("../database/connection");
const bcrypt = require('bcrypt');

class UserModel {

    // Return all users

    getAllUsers(callback) {
        connection.query('SELECT * FROM user', function (error, result) {
            if (error) {
                throw error
            }
            return callback(result)
        });
    }

    // Return user by ID

    async getUserById(id) {
        const pool = await getConnection()
        let result = await pool.request().query(`SELECT * FROM user WHERE Id = '${id}'`)
        return result.recordset[0]
    }

    // Return user by email

    async getUserByEmail(email, callback) {
        await connection.query(`SELECT * FROM user WHERE email = '${email}'`, function (error, result) {
            if (error) {
                throw error
            }
            return callback(result[0])
        });
    }

    // Return user by username

    async getUserByUsername(user) {
        const pool = await getConnection()
        let result = await pool.request().query(`SELECT * FROM users WHERE user = '${user}'`)
        return result.recordset[0]
    }

    // Return password by email 

    async getPasswordByEmail(email, callback) {
        await connection.query(`SELECT password_primary FROM user WHERE email = '${email}'`, function (error, result) {
            if (error) {
                throw error
            }
            return callback(result[0]);
        })
    }


    /////////////////////////////////////////////////////////////////////////////////////////////////

    // Create user in the DB

    async createUser(user) {
        user.password_primary = await bcrypt.hash(user.password_primary, 10);
        user.country = 1
        connection.query(`INSERT into user set ?`, [user], function (err, result) {
            if (err) {
                console.log(err)
                return err
            }
            console.log('add')
            return
        })
        return user
    }

}

module.exports = new UserModel()



