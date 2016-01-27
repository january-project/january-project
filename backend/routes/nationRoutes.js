var express = require('express');
var nationRouter = express.Router();
var mongoose = require('mongoose');
var Nation = require('../models/nation');

nationRouter.route('/')
    .get(function (req, res) {
        Nation.find({ user: req.user._id }, function (err, nations) {
            if (err) res.status(500).send(err);
            res.send(nations);
        });
    })
    .post(function (req, res) {
        var nation = new Nation(req.body);
        nation.user = req.user;
        nation.save(function (err, newNation) {
            if (err) res.status(500).send(err);
                res.send(newNation);
        });
    });

nationRouter.route('/usernation/:userId')
	.get(function (req, res) {
		Nation.findOne({"user._id": req.params.userId}, function(err, nation) {
			if (err) res.status(500).send(err);
			res.send(nation);
		});
});


nationRouter.route('/:nationId')
    .get(function (req, res) {
        Nation.findOne({id: req.params.nationId, user: req.user}, function (err, nation) {
            if (err) res.status(500).send(err);
            res.send(nation);
        });
    })
    .put(function (req, res) {
        Nation.findOneAndUpdate({id: req.params.nationId, user: req.user}, req.body, {new: true}, function (err, nation) {
            if (err) res.status(500).send(err);
            res.send(nation);
        })
    })
    .delete(function (req, res) {
        Nation.findOneAndRemove({id: req.params.nationId, user: req.user}, function (err, nation) {
            if (err) res.status(500).send(err);
            res.send(nation);
        })
    });

module.exports = nationRouter;
