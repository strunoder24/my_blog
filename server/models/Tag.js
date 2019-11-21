const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostsSchema = require('./Post').Schema;

const TagSchema = new Schema({
    name: 'String',
    // posts: [ PostsSchema ],
    create_date: Date,
    edit_date: Date
});

const Tag = mongoose.model('tag', TagSchema);

module.exports = {
    Schema: TagSchema,
    Tag
};