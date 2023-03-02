const LocalStrategy = require('passport-local').Strategy;
const mainModel = require('../model/mainModel');
const { getUserByEmail, createUser } = require('../model/user.model');


module.exports = initializePassport = (passport) => {
    const authenticateUser = async (email, password, done) => {
        try {

            // Check if the user is registered in the DB with the email

            if (await mainModel.existsByEmail(email)) {
                console.log(`El email ${email} no esta registrado!`);
                return done(null, false, { message: 'Usuario no registrado' });
            }

            // Search the user by his email and compare it with the password

            await mainModel.isPasswordValid(email, password);
            // console.log(a)
            // if (await mainModel.isPasswordValid(email, password)) {
            //     console.log(`El password no es validad!`);
            //     return done(null, false, { message: 'Contraseña incorrecta' });
            // }

            // If the user is registered and the password is valid, get the user

            await getUserByEmail(email, function (data) {
                done(null, data);
                return
            });

        } catch (err) {
            console.log(`Error al autenticar el usuario: ${err}`);
            return err
        }
    }

    const registerUser = async (req, email, password, done) => {
        const { first_name, second_name, username } = req.body
        try {

            // Check if the user is already registered

            if (await mainModel.existsByEmail(email)) {
                console.log(`El email ${email} ya esta registrado!`);
                return done(null, false, { message: 'Usuario ya registrado' })
            }

            // Create the user and save it in the DB with the cart id   

            const user = await createUser({
                email,
                password_primary: password,
                first_name,
                second_name,
                username
            })

            done(null, user)

        } catch (err) {
            console.log(`Error al registrar el usuario: ${err}`);
            done(err)
            return err
        }
    }

    passport.use('login', new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, authenticateUser))
    passport.use('register', new LocalStrategy({ usernameField: 'email', passwordField: 'password', passReqToCallback: true }, registerUser))

    passport.serializeUser((user, done) => done(null, user))
    passport.deserializeUser((user, done) => done(null, user))
}

