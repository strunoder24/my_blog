const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const controllers = require('../controllers/auth');

router.post('/signup', [
    check('email', 'Please enter a valid email').isEmail(),
    check('password').isLength({ min: 3, max: 34 })
], controllers.signup);

router.post('/signin', [
    check('email', 'Please enter a valid email').isEmail(),
    check('password').isLength({ min: 3, max: 34 })
], (controllers.signin));

router.post('/logout', (req, res) => {

});

router.get('/user-info', controllers.userInfo);

module.exports = router;