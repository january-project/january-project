var express = require('express');
var userRouter = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');

//userRouter.put('/:userId', function (req, res) {
//	User.findOneAndUpdate({_id: req.params.userId}, req.body, {new: true}, function(err, user){
//            if (err) res.status(500).send(err);
//            res.send(user);
//        })
//});


//changed to findById for bcrypt password hash hook
userRouter.put('/:userId', function(req, res) {
	User.findById(req.params.userId, function(err, user) {
		if(err) res.status(500).send(err);
		user.username = req.body.username || user.username;
		user.password = req.body.password || user.password;
		user.firstname = req.body.firstname || user.firstname;
		user.lastname = req.body.lastname || user.lastname;
		user.email = req.body.email || user.email;
		user.save(function(err, newUser) {
			if(err) res.status(500).send(err);
			res.send(newUser);
		});
	});
});

module.exports = userRouter;