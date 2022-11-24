const nodemailer = require('nodemailer')

function mail() {
    const mailTransporter = nodemailer.createTransport( {
        service:'gmail',
        auth: {
            user:'itsadityap25@gmail.com',
            pass: process.env.MAIL_PASS
        }
      }
    )
    
    const options = {
        from:'itsadityap25@gmail.com',
        to:'201397@juitsolan.in',
        subject:'Test Mail - Zekademy',
        text:"Thank You, For Signing Up to Zekademy"
    }
    
    mailTransporter.sendMail(options, (err, info) => {
        if(err)
        {   
            console.log(err);
            return;
        }
        console.log("Sent: " + info.response);
    })
}

module.exports = {
    mail
}