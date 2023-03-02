const { getUserByEmail, getPasswordByEmail } = require('./user.model')
const bcrypt = require('bcrypt')

class MainModel {

    async existsByEmail(email) {
        await getUserByEmail(email, function (data) {
            if (data === undefined) {
                return true
            }
            return false
        });
    }

    async isPasswordValid(email, password) {
        await getPasswordByEmail (email, async function (data) {
            return await bcrypt.compare(password, data.password_primary);
        })
    }


}


module.exports = new MainModel();
