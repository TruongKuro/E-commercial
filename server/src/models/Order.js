const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Order = new Schema({
    customerId: { type: Schema.Types.ObjectId, ref: 'User' },
    shopId: { type: Schema.Types.ObjectId, ref: 'User' },
    items: [{
        productId: { type: Schema.Types.ObjectId, ref: 'Product' },
        image: { type: String },
        name: { type: String },
        listPrice: { type: Number },
        price: { type: Number },
        quantity: { type: Number },
        sum: { type: Number },
    }, ],
    total: { type: Number },
    shippingFee: { type: Number },
    totalPayment: { type: Number },
    receiver: {type: String },
    phoneNumber: {type: String},
    address: { type: String },
    note: {type: String },
    status: { type: String, default: 'waiting' },
    date: { type: String, default: Date.now() },
    dateUpdate: { type: String, default: Date.now() },
}, { collection: 'orders' });

module.exports = mongoose.model('Order', Order);