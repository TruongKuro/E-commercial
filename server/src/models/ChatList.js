const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatList = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' }, 
    lists: [{
        to: { type: Schema.Types.ObjectId, ref: 'User' },
        date: {type: String, default: Date.now},
    },],

});


module.exports = mongoose.model('ChatList', ChatList);