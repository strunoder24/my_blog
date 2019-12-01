const express = require('express');
const router = express.Router();
const { check, body } = require('express-validator');
const controllers = require('../controllers/auth');
const { isLoggedUser } = require('../controllers/auth');


router.post('/setup', [
    check('email', 'Please enter a valid email').isEmail(),
    check('password').isLength({ min: 3, max: 34 }),
    body('email')
        .isEmail()
        .normalizeEmail(),
], controllers.setup);

router.post('/signup', [
    check('email', 'Please enter a valid email').isEmail(),
    check('password').isLength({ min: 3, max: 34 }),
    body('email')
        .isEmail()
        .normalizeEmail(),
], controllers.signup);

router.post('/signin', [
    check('email', 'Please enter a valid email').isEmail(),
    check('password').isLength({ min: 3, max: 34 }),
    body('email')
        .isEmail()
        .normalizeEmail(),
], (controllers.signin));

router.post('/logout', controllers.logout);

router.get('/user-info', isLoggedUser, controllers.userInfo);

module.exports = router;