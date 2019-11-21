const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const PostSchema = new Schema({
    title: {
        type: String,
        index: true
    },
    markdown: String,
    preview_text: String,
    lang: String,
    likes: Number,
    // main_image: ImageSchema,
    tags: [ {type: Schema.ObjectId, ref: 'tag'} ],
    is_published: Boolean,
    create_date: Date,
    edit_date: Date,
});

PostSchema.plugin(mongoosePaginate);

const Post = mongoose.model('post', PostSchema);

module.exports = {
    Schema: PostSchema,
    Post
};