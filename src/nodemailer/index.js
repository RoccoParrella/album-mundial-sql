const nodemailer = require('nodemailer')

const sendEmail = async () => {

    const config = {
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: 'findyourpet.help@gmail.com',
            pass: 'bezapqxejtqqyxes'
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