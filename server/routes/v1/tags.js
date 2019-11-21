const express = require('express');
const router = express.Router();
const controllers = require('../../controllers/v1/tags');

router.post('/tags', controllers.createTag);
router.get('/tags', controllers.getTags);
router.put('/tags/:_id', controllers.changeTag);
router.delete('/tags/:_id', controllers.deleteTag);

module.exports = router;