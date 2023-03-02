const nodemailer = require('nodemailer')
const { passwordEmail } =  require('../config/config')

const sendEmail = async () => {

    const config = {
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: 'findyourpet.help@gmail.com',
            pass: passwordEmail
        }
    }

    let mensaje = {
        from: 'findyourpet.help@gmail.com',
        to: 'businessroccoparrella@gmail.com',
        subject: 'Restablecer password',
        text: 'TEST 1'
    }

    const transport = nodemailer.createTransport(config)

    const info = await transport.sendMail(mensaje)

    console.log(info)

}

sendEmail()