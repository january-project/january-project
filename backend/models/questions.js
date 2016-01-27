var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = new Schema({
	question: String,
	availableOptions: [],
	selectedOption: Schema.Types.Mixed 
});

module.exports = mongoose.model('Question', questionSchema);
