var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/featuresPage', function(req, res, next) {
  res.render('featuresPage');
});
router.get('/officalTemplat', function(req, res, next) {
  res.render('templatePage');
});
router.get('/previewPage', function(req, res, next) {
  res.render('previewPage' );
});
router.get('/login', function(req, res, next) {
  res.render('login');
});
router.get('/signup', function(req, res, next) {
  res.render('signup');
});
router.get('/editPage', function(req, res, next) {
  res.render('webBuilder');
});

module.exports = router;
