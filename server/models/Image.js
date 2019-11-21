const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const ImageSchema = new Schema({
    original_url: String,
    public_id: String,
});

ImageSchema.plugin(mongoosePaginate);

const Image = mongoose.model('image', ImageSchema);

module.exports = {
    Schema: ImageSchema,
    Image
};