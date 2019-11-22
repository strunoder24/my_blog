const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
const Post = require('../../models/Post').Post;

const createPost = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(404).json(errors.errors[0])
    }
    
    Post.create({
        title: req.body.title,
        markdown: req.body.markdown,
        preview_text: req.body.preview_text,
        lang: req.body.lang,
        likes: 0,
        main_image: req.body.main_image,
        tags: req.body.tags,
        is_published: req.body.is_published,
        create_date: req.body.create_date,
        edit_date: req.body.edit_date,
    }, (err, post) => {
        if (err) return res.status(400).json(err);

        res.json(post)
    })
};

const getPosts = (req, res) => {
    Post.paginate({}, {
        limit: 10,
        populate: ['main_image', 'tags']
    })
        .then(posts => res.json(posts))
};

module.exports = {
    createPost,
    getPosts
};