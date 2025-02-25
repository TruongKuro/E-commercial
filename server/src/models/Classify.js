const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Classify = new Schema({
    name: { type: String },
    categoryId: { type: String }
});


module.exports = mongoose.model('Classify', Classify);