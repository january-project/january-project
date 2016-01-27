var express = require('express');
var ideologyRouter = express.Router();
var mongoose = require('mongoose');
var Ideology = require('../models/ideology');

ideologyRouter.route('/')
  .get(function(req, res) {
    Ideology.find({
      user: req.user._id
    }, function(err, ideology) {
      if (err) {
        res.status(500).send(err);
      }
      res.send(ideology);
    });
  })
  .post(function(req, res) {
    var ideology = new Ideology(req.body);
    ideology.user = req.user;
    ideology.save(function(err) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(ideology);
      }
    });
  });

ideologyRouter.route('/:chosenIdeology')
  .get(function(req, res) {
    Ideology.find({
      chosenIdeology: req.params.chosenIdeology
    }, function(err, ideologies) {
      if (err) {
        res.status(500).send(err);
      }
      res.send(ideologies);
    });
  });


module.exports = ideologyRouter;
