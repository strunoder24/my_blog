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

const findTagId = (name) => {
    return Tag.findOne({name})
        .then(tag => {
            return tag["_id"];
        })
        .catch(e => {
            console.log(e);
        })
};

module.exports = {
    Schema: TagSchema,
    Tag,
    findTagId
};