var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var flagSchema = new Schema({
	flagName: String,
	flagUrl: String
});

module.exports = mongoose.model('Flag', flagSchema);