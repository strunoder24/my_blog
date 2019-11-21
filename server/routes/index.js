const express = require('express');
const router = express.Router();
const sanitize = require('mongo-sanitize');
const auth = require('./auth');
const api_v1 = require('./v1');

router.get('/', (req, res) => {
    res.json({
        status: 'OK',
        msg: 'This is root of an api. Try go "api/v1" '
    })
});

router.use((req, res, next) => {
    req.body = sanitize(req.body);
    req.params = sanitize(req.params);
    req.query = sanitize(req.query);
    next()
});

router.use(auth);
router.use('/api/v1', api_v1);

module.exports = router;