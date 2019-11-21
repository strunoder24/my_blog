const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User').User;
const config = require('../config');

const { validationResult } = require('express-validator');


let signup = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(404).json(errors.errors[0])
    }
    
    User.findOne({}, (err, document) => {
        if (err) return res.send(err);
        
        if (document === null) {
            User.create({
                email,
                password: bcrypt.hashSync(password, 8),
                isAdmin: true
            }, (err, user) => {
                if (err) return res.status(400).json({msg: 'get out'});
                
                let token = jwt.sign({id: user._id}, config.secret, {expiresIn: 86400});
                res.json({auth: true, token, user: {email, isAdmin: true}})
            });
        } else {
            return res.status(401).json({msg: 'Admin is already exist. GTFO'})
        }
    });
};

let signin = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(404).json(errors.errors[0])
    }
    
    User.findOne({email}, (err, user) => {
        if (err) return res.status(500).json({msg: err});
        else if (!user) return res.status(401).json({auth: false, token: null, msg: 'Invalid credentials'});
        
        let isValid = bcrypt.compareSync(password, user.password);
        
        if (!isValid) {
            return res.status(401).json({auth: false, token: null, msg: 'Invalid credentials'});
        } else {
            let token = jwt.sign({id: user._id}, config.secret, {expiresIn: 86400});
            res.json({auth: true, token, user: {email, isAdmin: user.isAdmin}})
        }
    });
};

let userInfo = (req, res) => {
    let token = req.headers.jwt;
    jwt.verify(token, config.secret, (err, tokenInfo) => {
        if (err) return res.status(400).json(err);
        
        User.findOne({_id: tokenInfo.id}, (error, user) => {
            if (error) return res.status(400).json(error);
            res.json({ email: user.email, isAdmin: user.isAdmin });
        })
    });
};

module.exports = {
    signup,
    signin,
    userInfo
};