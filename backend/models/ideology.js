var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Ideology = new Schema({
  chosenIdeology: {
    type: String,
    required: true,
    enum: ['Anarchism', 'Communism', 'Marxism', 'Marxism-Leninism', 'Maoism', 'Liberal Conservatism',
      'Libertarian Conservatism', 'Paleoconservatism', 'Neoconservatism', 'Progressivism', 'Liberal Socialism',
      'Democratic Socialism', 'Social Democracy', 'Fascism', 'National Socialism', 'National Conservatism'
    ]
  },
  authoritarian: {
    type: Number,
    required: true
  },
  controlledEconomy: {
    type: Number,
    required: true
  },
  progressive: {
    type: Number,
    required: true
  },
  nationalism: {
    type: Number,
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

module.exports = mongoose.model('Ideology', Ideology);
