const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete')

const Shop = new Schema({
    _id: { type: Schema.Types.ObjectId },
    name: { type: String },
    avatar: { type: String, default: 'avatar-blank.jpg' },
    coverImage: { type: String, default: 'avatar-blank.jpg' },

}, { collection: 'shops' });

mongoose.plugin(slug);
Shop.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
})

module.exports = mongoose.model('Shop', Shop);