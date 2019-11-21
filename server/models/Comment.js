const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = require('./User').Schema;
const PostSchema = require('./Post').Schema;

const CommentSchema = new Schema({
    author: UserSchema,
    posts: [ PostSchema ],
    parent: this,
    text: String,
    likes: Number,
    create_date: Date,
    edit_date: Date
});

const Comment = mongoose.model('comment', CommentSchema);

module.exports = {
    Schema: CommentSchema,
    Comment
};