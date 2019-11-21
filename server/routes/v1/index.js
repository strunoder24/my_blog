const express = require('express');
const router = express.Router();
const posts = require('./posts');
const tags = require('./tags');
const images = require('./images');

router.get('/', (req, res) => {
    res.json({
        status: 'OK',
        msg: 'hey, its root page for api'
    })
});

router.use(posts);
router.use(tags);
router.use(images);

module.exports = router;