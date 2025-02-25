const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const View = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    productId: { type: Schema.Types.ObjectId, ref: 'Product' },
    time: { type: String }
}, { collection: 'views' });

module.exports = mongoose.model('View', View);