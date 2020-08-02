var express = require('express');
var router = express.Router();
var conn = require('../db');

router.get('/login', function (req, res, next) {
  res.render('login');
});
router.get('/login/signup', function (req, res, next) {
  res.render('signup');
});
router.get('/login/profile', function (req, res, next) {
  res.render('profile');
});




module.exports = router;
