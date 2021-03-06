var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Abacus Learning Lab', user: req.user, anyArray: [10,20,'Hello'] });
  if (req.user) res.redirect('/dashboard');
});

router.get('/about', function(req, res, next) {
  res.render('about');
});

router.get('/dashboard', function(req, res, next) {
  if(req.user) {
    res.render('dashboard', { user: req.user });
  } else {
    res.redirect('/');
  }

});

router.get('/register', function(req, res) {
  if (req.user) res.redirect('/dashboard');
  res.render('register', { });
});

router.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
            return res.render('register', { account : account });
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/dashboard');
        });
    });
});

router.get('/login', function(req, res) {
    res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/dashboard');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});

module.exports = router;
