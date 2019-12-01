const express = require('express');
const router = express.Router();
const controllers = require('../../controllers/v1/tags');
const { isLoggedUser, isAdmin } = require('../../controllers/auth');

router.post('/tags', isLoggedUser, isAdmin, controllers.createTag);
router.get('/tags', controllers.getTags);
router.put('/tags/:_id', isLoggedUser, isAdmin, controllers.changeTag);
router.delete('/tags/:_id', isLoggedUser, isAdmin, controllers.deleteTag);

module.exports = router;