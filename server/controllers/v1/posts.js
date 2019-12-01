const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
const Post = require('../../models/Post').Post;
const { findTagId } = require('../../models/Tag');

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
    }, (err, posts) => {
        if (err) return res.status(400).json(err);

        res.json(posts)
    })
};

const getPosts = async (req, res) => {
    let mongoQuery = {};
    
    let is_published = req.query.is_published;
    let page = req.query.p;
    let tag = req.query.t;
    
    if (is_published) mongoQuery.is_published = is_published;
    if (tag && tag.length !== 0) mongoQuery.tags = await findTagId(tag);
    
    Post.paginate(mongoQuery, {
        limit: 10,
        populate: ['main_image', 'tags'],
        page: page ? page : 1
    })
        .then(posts => res.json(posts))
};

const getSinglePost = (req, res) => {
    const id = req.params.id;
    
    Post.findById(id)
        .populate(['main_image', 'tags'])
        .then(post => {
            res.json(post)
        })
        .catch(err => {
            res.status(400).json(err);
        })
};

const updatePost = (req, res) => {
    const id = req.params.id;
    
    Post.findByIdAndUpdate(id, {
        ...req.body
    }, (err, post) => {
        if (err) return res.status(400).json(err);
    
        res.json(post)
    })
};

const deletePost = (req, res) => {
    const id = req.params.id;
    
    Post.findByIdAndDelete(id, (err) => {
        if (err) return res.status(400).json(err);
    
        res.json({
            status: 'OK',
            msg: 'Deleted successfully'
        })
    })
};

module.exports = {
    createPost,
    getPosts,
    getSinglePost,
    updatePost,
    deletePost
};