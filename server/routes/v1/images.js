const express = require('express');
const router = express.Router();
const { imageParser } = require('../../config');
const Image = require('../../models/Image').Image;
const { isLoggedUser } = require('../../controllers/auth');


router.post('/images', isLoggedUser, imageParser.single('file'), (req, res) => {
    const image = {};
    image.original_url = req.file.url;
    image.public_id = req.file.public_id;
    Image.create(image)
        .then(newImage => res.json(newImage))
        .catch(err => console.log(err));
});

router.get('/images', (req, res) => {
    Image.paginate({}, {limit: 15}, (err, results) => {
        if (err) res.status(400).json(err);
        
        res.json(results)
    })
});

module.exports = router;