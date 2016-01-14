var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = require('./user').schema;

var nationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
    owner: {
        type: Schema.Types.Mixed,
        ref: 'User'
    }
});

module.exports = mongoose.model('Nation', nationSchema);