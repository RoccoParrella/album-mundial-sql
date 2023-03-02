const { getAllUsers } = require("../model/user.model");

module.exports = {
    getHome: (req, res) => {
        getAllUsers(function (data) {
            res.json(data)
            return
        })
    },
    getEnter: (req, res) => {
        res.sendStatus(201);
    },
    getLogin: (req, res) => {
        res.render('login');
    },
    getRegister: (req, res) => {
        res.render('register')
    },
    getLogout: (req, res) => {
        req.logout(function (err) {
            if (err) { return next(err); }
            res.redirect('/');
        });
    }
}

