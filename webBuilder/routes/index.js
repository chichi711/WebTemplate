var express = require('express');
var router = express.Router();
var conn = require('../db');



router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/features', function (req, res, next) {
  res.render('featuresPage');
});
router.get('/officalTemplat', function (req, res, next) {
  res.render('templatePage');
});
router.get('/preview', function (req, res, next) {
  res.render('previewPage');
});
router.get('/officalTemplat/preview', function (req, res, next) {
  res.render('preview');
});
router.get('/officalTemplat/preview_b', function (req, res, next) {
  res.render('preview_b');
});


module.exports = router;
