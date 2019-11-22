const express = require('express');
const router = express.Router();
const controllers = require('../../controllers/v1/posts');

router.post('/posts', controllers.createPost);

router.get('/posts', controllers.getPosts);

module.exports = router;