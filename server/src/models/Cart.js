const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');

const Cart = new Schema({
    shopId: { type: Schema.Types.ObjectId, ref: 'User' },
    customerId: { type: Schema.Types.ObjectId, ref: 'User' },
    items: [{
        productId: { type: Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number },
        date: {type: String, default: Date.now},
    }, ],
    createDate: { type: String, default: Date.now},
}, { collection: 'carts' });

mongoose.plugin(slug);
module.exports = mongoose.model('Cart', Cart);