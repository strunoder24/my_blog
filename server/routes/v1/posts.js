const express = require('express');
const router = express.Router();
const controllers = require('../../controllers/v1/posts');
const { isLoggedUser } = require('../../controllers/auth');

router.post('/posts', isLoggedUser, controllers.createPost);

router.get('/posts', controllers.getPosts);

router.get('/posts/:id', controllers.getSinglePost);

router.patch('/posts/:id', isLoggedUser, controllers.updatePost);

router.delete('/posts/:id', isLoggedUser, controllers.deletePost);

module.exports = router;