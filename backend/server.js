var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var unless = require('express-unless');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

var config = require('./config');
var authRoutes = require('./routes/authRoutes');
var nationRoutes = require('./routes/nationRoutes');
var userRoutes = require('./routes/userRoutes');
var flagRoutes = require('./routes/flagRoutes');
var flags = require('./preload/preloadFlags');
var questions = require('./preload/preloadQuestions');

MongoClient.connect(config.database, function(err, db){
	if(err){
		console.log('There was an errror ', err);
	}else{
		var collection = db.collection('flags');
		collection.find({flagName: 'usa'}).toArray(function(err, results) {
			if(err) {
				console.log(err);
			} else if (results.length) {
				console.log(results);
				db.close();
			} else {
				collection.insert(flags.flags, function(err, results) {
					if(err)console.log(err);
					console.log(results);
				});
				collection = db.collection('questions');
				collection.insert(questions.questions, function(err, results) {
					if(err)console.log(err);
					console.log(results);
					db.close();
				});
			};
		});
	};
});

var port = process.env.PORT || 5000;
mongoose.connect(config.database);

app.use(function (req, res, next) {
    if (req.headers.origin) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');
        if (req.method === 'OPTIONS') return res.sendStatus(200);
    }
    next();
});

app.use(cors());

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/api', expressJwt({ secret: config.secret }));
app.use('/api/nation', nationRoutes);
app.use('/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/flags', flagRoutes);


app.listen(port, function () {
    console.log('Reached Port ' + port);
});
