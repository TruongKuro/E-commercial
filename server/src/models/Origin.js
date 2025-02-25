const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Origin = new Schema({
    name: { type: String }
});

module.exports = mongoose.model('Origin', Origin);