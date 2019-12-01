const express = require('express');
const router = express.Router();
const controllers = require('../../controllers/v1/posts');
const { isLoggedUser, isAdmin } = require('../../controllers/auth');

router.post('/posts', isLoggedUser, isAdmin, controllers.createPost);

router.get('/posts', controllers.getPosts);

router.get('/posts/:id', controllers.getSinglePost);

router.patch('/posts/:id', isLoggedUser, isAdmin, controllers.updatePost);

router.delete('/posts/:id', isLoggedUser, isAdmin, controllers.deletePost);

module.exports = router;