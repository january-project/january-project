var express = require('express');
var flagRouter = express.Router();
var mongoose = require('mongoose');
var Flag = require('../models/flags');

flagRouter.route('/')
	.get(function (req, res) {
		Flag.find(function (err, flags) {
			if (err) res.status(500).send('There was an error at flagRouter.get' + err);
			res.send(flags);
		})
	});

flagRouter.route('/:flagId')
	.get(function (req, res) {
		Flag.findById(req.params.flagId, function(err, flag) {
			if(err) res.status(500).send(err);
			res.send(flag);
		});
	});


module.exports = flagRouter;