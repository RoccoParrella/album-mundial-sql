const express = require('express');
const config = require('./config/config');
const userRoutes = require('./routes/user.route');
const path = require('path');
const connection = require('./database/connection')

const passport = require('passport')
const session = require('express-session');
const flash = require('express-flash')
const MySQLStore = require('express-mysql-session')(session);
const initializePassport = require('./passport/local')

const app = express();
app.set('port', config.PORT)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const sessionStore = new MySQLStore({
    expiration: 86400000,
    createDatabaseTable: true,
    schema: {
        tableName: 'sessions',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
}, connection);

initializePassport(passport)

// Middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(session({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: false,
    store: sessionStore
}));
app.use(passport.initialize());
app.use(passport.session());

app.use("/public", express.static(path.join(__dirname, 'public')))


app.use('/', userRoutes)


module.exports = app;