const express = require('express');
const router = express.Router();
const posts = require('./posts');
const tags = require('./tags');

router.get('/', (req, res) => {
    res.json({
        status: 'OK',
        msg: 'hey, its root page for api'
    })
});

router.use(posts);
router.use(tags);

module.exports = router;