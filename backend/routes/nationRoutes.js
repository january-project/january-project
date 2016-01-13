var express = require('express');
var nationRouter = express.Router();
var mongoose = require('mongoose');
var Nation = require('../models/nation');

nationRouter.route('/')
    .get(function (req, res) {
        console.log(req.user);
        Nation.find({ user: req.user._doc._id }, function (err, nations) {
            if (err) {
                res.status(500).send(err);
            }
            res.send(nations);
        });
    })
    .post(function (req, res) {
        var nation = new Nation(req.body);
        console.log("req.user:");
        console.log(req.user);
        nation.user = req.user._doc;
        console.log("nation:");
        console.log(nation);
        nation.save(function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(nation);
            }
        });
    });


nationRouter.route('/:nationId')
    .get(function (req, res) {
        Nation.findOne({
            id: req.params.nationId,
            user: req.user
        }, function (err, nation) {
            if (err) res.status(500).send(err);
            res.send(nation);
        });
    })
    .put(function (req, res) {
        Nation.findOneAndUpdate({
            id: req.params.nationId,
            user: req.user
        }, req.body, {
            new: true
        }, function (err, nation) {
            if (err) res.status(500).send(err);
            res.send(nation);
        })
    })
    .delete(function (req, res) {
        Nation.findOneAndRemove({
            id: req.params.nationId,
            user: req.user
        }, function (err, nation) {
            if (err) res.status(500).send(err);
            res.send(nation);
        })
    });

module.exports = nationRouter;
