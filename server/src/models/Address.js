const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Address = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    name: { type: String },
    phoneNumber: { type: String },
    city: { type: String },
    district: { type: String },
    ward: { type: String },
    detail: { type: String },
    type: { type: String },

}, { collection: 'addresses' });

module.exports = mongoose.model('Address', Address);