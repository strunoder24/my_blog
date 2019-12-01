const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User').User;
const { addToBlacklist, checkForBlacklist, cleanBlacklist } = require('../models/TokenBlacklist');
const config = require('../config');

const { validationResult } = require('express-validator');

const setup = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(404).json(errors.errors[0]);
    
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
                res.json({auth: true, token, user: {email, isAdmin: user.isAdmin}})
            });
        } else {
            return res.status(401).json({msg: 'Admin is already exist. GTFO'})
        }
    });
};

const signup = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(404).json(errors.errors[0]);
    
    User.findOne({email}, (err, document) => {
        if (err) return res.send(err);
        
        if (document === null) {
            User.create({
                email,
                password: bcrypt.hashSync(password, 8),
                isAdmin: false
            }, (err, user) => {
                if (err) return res.status(400).json(err);
                
                let token = jwt.sign({id: user._id}, config.secret, {expiresIn: 86400});
                res.json({auth: true, token, user: {email, isAdmin: user.isAdmin}})
            });
        } else {
            return res.status(409).json({msg: 'User with that email is already exist'})
        }
    });
};

const signin = (req, res) => {
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

const userInfo = (req, res) => {
    let token = req.headers.token;
    jwt.verify(token, config.secret, (err, tokenInfo) => {
        if (err) return res.status(400).json(err);
        
        User.findOne({_id: tokenInfo.id}, (error, user) => {
            if (error) return res.status(400).json(error);
            res.json({ email: user.email, isAdmin: user.isAdmin });
        })
    });
};

const logout = async (req, res) => {
    let token = req.headers.token;
    await addToBlacklist(token);
    
    res.json({
        status: 'OK',
        msg: 'Successfully logout'
    })
};

isLoggedUser = async (req, res, next) => {
    let token = req.headers.token;
    
    if (!token) res.status(401).json({
        status: "DENIED",
        msg: "Token not send. You are not an admin GTFO"
    });
    
    jwt.verify(token, config.secret, async (err) => {
        if (err) return res.status(401).json(err);
    
        const isAtBlacklist = await checkForBlacklist(token);
        if (isAtBlacklist) return res.status(401).json(isAtBlacklist);
        
        next()
    })};

isAdmin = async (req, res, next) => {
    let token = req.headers.token;
    let user = jwt.decode(token);
    
    User.findById(user.id)
        .then(user => {
            if (user.isAdmin) {
                next()
            } else {
                res.status(401).json({
                    status: "DENIED",
                    msg: 'You are not an admin'
                })
            }
        })
        .catch(e => {
            console.log(e);
        })
};

module.exports = {
    setup,
    signup,
    signin,
    logout,
    userInfo,
    isLoggedUser,
    isAdmin
};