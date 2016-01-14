var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Nation = new Schema({
    name: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Nation', Nation);
