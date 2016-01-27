var express = require('express');
var questionRouter = express.Router();
var mongoose = require('mongoose');
var Question = require('../models/questions');

questionRouter.route('/')
	.get(function (req, res) {
		Question.find(function (err, questions) {
			if (err) res.status(500).send('There was an error at flagRouter.get' + err);
			res.send(questions);
		})
	});



module.exports = questionRouter;