const User = require('../models/user');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const mailer = require('../controllers/mailer')

let emailUser = {}
// Register User
exports.register = (req, res) => {

    emailUser = req.body.email;
    
    const errors = validationResult(req);
    
    if(!errors.isEmpty()) {
        return res.status(422).json({
            success: false,
            error: errors.array()[0].msg
        })
    }

    const user = new User(req.body)
    user.save((err, user) => {
        if(err) {
            return res.status(400).json({
                success: false,
                error: "Invalid Request! Email or Username already exists!"
            })
        }

        // Create Token
        const token = jwt.sign({_id: user._id}, process.env.SECRET)

        // Put token in cookie
        res.cookie('token', token, {expire: new Date() + 9999});

        mailer.mail()

        res.json({
            success: true,
            token,
            user: 
            {
                email: user.email,
                id: user._id
            }
        });
    })
}

exports.emailExport = '201397@gmail.com'


// Sign In User
exports.login = (req, res) => {
    const {password, email} = req.body;
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(422).json({
            success: false,
            error: errors.array()[0].msg
        })
    }

    User.findOne({email}, (err, user) => {
        if(err || !user) {
            return res.status(400).json({
                success: false,
                error: "Email not found"
            })
        }
        if(!user.authenticate(password)) {
            return res.status(401).json({
                success: false,
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