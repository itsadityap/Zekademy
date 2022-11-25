const User = require('../models/user');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')

let bodyDataEmail = ''

function mail() 
{   
    const mailTransporter = nodemailer.createTransport( {
        service:'gmail',
        auth: {
            user:'itsadityap25@gmail.com',
            pass: process.env.MAIL_PASS
        }
      }
    )
    console.log(bodyDataEmail);
    const options = {
        from:'itsadityap25@gmail.com',
        to: bodyDataEmail,
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

// Register User
exports.register = (req, res) => {
    
    bodyDataEmail = JSON.stringify(req.body.email)
    const errors = validationResult(req);
    
    if(!errors.isEmpty()) {
        return res.status(422).json({
            message: 'failed',
            error: errors.array()[0].msg
        })
    }

    const user = new User(req.body)
    user.save((err, user) => {
        if(err) {
            return res.status(400).json({
                message: 'failed',
                error: "Invalid Request! Email or Username already exists!"
            })
        }

        // Create Token
        const token = jwt.sign({_id: user._id}, process.env.SECRET)

        // Put token in cookie
        res.cookie('token', token, {expire: new Date() + 9999});

        mail();

        res.json({
            message: 'Success',
            token,
            user: 
            {
                email: user.email,
                id: user._id
            }
        });
    })
}


// Sign In User
exports.login = (req, res) => {
    const {password, email} = req.body;
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(422).json({
            message: 'failed',
            error: errors.array()[0].msg
        })
    }

    User.findOne({email}, (err, user) => {
        if(err || !user) {
            return res.status(400).json({
                message: 'failed',
                error: "Email not found"
            })
        }
        if(!user.authenticate(password)) {
            return res.status(401).json({
                message: 'failed',
                error: "Invalid Credentials"
            })
        }

        // Create Token
        const token = jwt.sign({_id: user._id}, process.env.SECRET)

        // Put token in cookie
        res.cookie('token', token, {expire: new Date() + 9999});

        // Send response to front end
        const {_id, email} = user;
        
        return res.json({
            success: true,
            token, 
            user: {id: _id, email}
        });
    })

}

// Signout
exports.signout = (req, res) => {
    res.clearCookie('token');
    res.json({
        message: "User signed out"
    });
}