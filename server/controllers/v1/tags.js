const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
const Post = require('../../models/Post').Post;
const Tag = require('../../models/Tag').Tag;

const createTag = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(404).json(errors.errors[0])
    }
    
    Tag.create({
        name: req.body.name,
        create_date: req.body.create_date,
        edit_date: req.body.edit_date,
    }, (err, post) => {
        if (err) return res.status(400).json(err);
        
        res.json(post)
    })
};

const getTags = (req, res) => {
    Tag.find({}).then(tags => res.json(tags));
};

const changeTag = (req, res) => {
    Tag.findByIdAndUpdate(req.params._id, {
        name: req.body.name
    }, (err, tag) => {
        if (err) return res.status(400).json(err);
        res.json(tag)
    });
};

const deleteTag = (req, res) => {
    Tag.findByIdAndDelete(req.params._id, (err) => {
        if (err) return res.status(400).json(err);
        
        res.json({
            status: 'OK',
            msg: 'Deleted successfully'
        })
    });
};

module.exports = {
    createTag,
    getTags,
    changeTag,
    deleteTag
};