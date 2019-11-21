const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        index: true
    },
    password: String,
    isAdmin: Boolean,
});

const User = mongoose.model('user', UserSchema);

module.exports = {
    Schema: UserSchema,
    User
};