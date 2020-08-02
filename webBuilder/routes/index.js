var express = require('express');
var router = express.Router();
var conn = require('../db');

/* GET home page. */

router.get("/editPage/demo", function (request, response) {

  conn.query('select * from account',
      '',
      function (err, rows) {
          if (err) {
              console.log(JSON.stringify(err));
              return;
          }

          response.send(JSON.stringify(rows));
      }
  );

})
router.post("/editPage/data", function (request, response) {

	conn.query(
		"insert into account set mID = 1, tID = 1,aName = ?, explanation = ?",
			[
				request.body.title,
				request.body.ymd
			]);
	response.send("row inserted.");

})

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/features', function(req, res, next) {
  res.render('featuresPage');
});
router.get('/officalTemplat', function(req, res, next) {
  res.render('templatePage');
});
router.get('/preview', function(req, res, next) {
  res.render('previewPage' );
});
router.get('/edit', function(req, res, next) {
  // res.render('eedit');
  res.render('webBuilder');
});
router.get('/officalTemplat/preview', function(req, res, next) {
  res.render('preview');
});


module.exports = router;
