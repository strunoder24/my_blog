const express = require('express');
const router = express.Router();
const controllers = require('../../controllers/v1/posts');

router.post('/posts', controllers.createPost);

module.exports = router;