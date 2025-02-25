const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');
const { TokenExpiredError } = require('jsonwebtoken');

const User = new Schema({
    name: { type: String },
    gender: { type: String, default: 'male' },
    day: { type: String, default: '1' },
    month: { type: String, default: '1' },
    year: { type: String, default: '1990' },
    phoneNumber: { type: String },
    password: { type: String },
    role: { type: String, default: 'customer' },
    slug: { type: String, slug: 'name', unique: true },
    avatar: { type: String, default: 'avatar-blank.jpeg' },
    nameShop: { type: String },
    avatarShop: { type: String, default: 'avatar-blank.jpeg' },
    coverImage: { type: String, default: 'cover-image.jpg' },
}, { collection: 'users' });

mongoose.plugin(slug);
User.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
})

module.exports = mongoose.model('User', User);