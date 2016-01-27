var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Nation = new Schema({
    name: {
        type: String,
        required: true,
		unique: true
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.Mixed,
        ref: 'User'
    },
	ideoType: String,
	flag: String,
	leaderType: String,
	qAnswers: [String]
});

module.exports = mongoose.model('Nation', Nation);
