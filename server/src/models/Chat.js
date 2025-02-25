const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Chat = new Schema({
    from: { type: Schema.Types.ObjectId, ref: 'User' },
    to: { type: Schema.Types.ObjectId, ref: 'User' },
    message: { type: String },
    type: {type: String},
    date: {type: String, default: Date.now},  
}, {timestamps: true, collection: 'chats' });


module.exports = mongoose.model('Chat', Chat);