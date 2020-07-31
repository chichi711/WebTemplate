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
router.get('/editPage', function(req, res, next) {
  res.render('webBuilder');
});
router.get('/officalTemplat/preview', function(req, res, next) {
  res.render('preview');
});

module.exports = router;
