const express = require('express');
const router = express.Router();
const controllers = require('../../controllers/v1/tags');
const { isLoggedUser } = require('../../controllers/auth');

router.post('/tags', isLoggedUser, controllers.createTag);
router.get('/tags', controllers.getTags);
router.put('/tags/:_id', isLoggedUser, controllers.changeTag);
router.delete('/tags/:_id', isLoggedUser, controllers.deleteTag);

module.exports = router;