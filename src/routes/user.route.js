const { Router } = require("express");
const router = Router();
const passport = require('passport');
const auth = require('../middlewares/auth')
const authInverse = require('../middlewares/authInverse')
const { getHome, getEnter, getLogin, getRegister, getLogout } = require('../controller/user.controller')


router.get('/', getHome);

router.get('/enter', auth, getEnter)

router.get('/login', authInverse, getLogin);

router.get('/register', authInverse, getRegister)

router.post('/login', passport.authenticate('login', {
  successRedirect: '/enter',
  failureRedirect: '/login',
  failureFlash: true
}));

router.post('/register', passport.authenticate('register', {
  successRedirect: '/enter',
  failureRedirect: '/register',
  failureFlash: true
}));

router.get('/logout', auth, getLogout);

module.exports = router;