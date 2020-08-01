var express = require('express');
var router = express.Router();
var conn = require('../db');

/* GET home page. */

router.get("/home/news", function (request, response) {

  connection.query('select * from news',
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
router.post("/home/news", function (request, response) {

	conn.query(
		"insert into account set aName = ?, explain = ?", 
			[
				request.body.title, 
				request.body.ymd
			]);
	response.send("row inserted.");
    
})

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
