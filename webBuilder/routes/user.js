var express = require('express');
var router = express.Router();
var conn = require('../db');

router.get('/', function (req, res, next) {
  res.render('login');
});
router.get('/signup', function (req, res, next) {
  res.render('signup');
});
router.get('/profile', function (req, res, next) {
  res.render('profile');
});




module.exports = router;
