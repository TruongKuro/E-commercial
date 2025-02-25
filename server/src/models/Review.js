const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete')

const Review = new Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    items: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        starNumber: { type: Number, default: 5 },
        content: { type: String },
        date: { type: String, default: Date.now() },
        usefulNumber : {type: Number, default: 0},
        image1: {type: String, default:'https://nationaltoday.com/wp-content/uploads/2020/01/chocolatecake-1.jpg'},
        image2: {type: String, default:'https://nationaltoday.com/wp-content/uploads/2020/01/chocolatecake-1.jpg'},
        image3: {type: String, default:'https://nationaltoday.com/wp-content/uploads/2020/01/chocolatecake-1.jpg'},
        image4: {type: String, default:'https://nationaltoday.com/wp-content/uploads/2020/01/chocolatecake-1.jpg'},
        image5: {type: String, default:'https://nationaltoday.com/wp-content/uploads/2020/01/chocolatecake-1.jpg'}
    },],

}, { collection: 'reviews' });

mongoose.plugin(slug);
Review.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
})

module.exports = mongoose.model('Review', Review);