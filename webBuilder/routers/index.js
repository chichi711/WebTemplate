var express = require('express');
var router = express.Router();
var conn = require('../db');

router.get('/', function (request, response, next) {
    response.render("index");
});

router.post("/", function (request, response) {
  conn.query(
    'SELECT * FROM member where email = ?',
    [request.body.Email],
    function (err, rows) {
      if (err || request.body.uPwd != rows[0].uPwd) {
        console.log(JSON.stringify(err));
        return;
      }
      response.locals.uName = rows[0].uName;
      console.log('res.locals.uName', response.locals.uName);
    });
  response.sendStatus(200);
})

router.get('/', function (request, response) {
  response.render('index', { title: 'Express' });
});
router.get('/features', function (request, response) {
  response.render('featuresPage');
});
router.get('/officalTemplat', function (request, response) {
  conn.query('select * from template',
  function (err, rows) {
    if (err) throw err;
    response.render('templatePage', { template: rows });
  });
});
// 從網址取得樣板類型及名稱，並將值傳入preview
router.get('/officalTemplat/:type/:name', function (request, response) {
  console.log(request.params.type);
                                                  //  ↓網址的變數
  response.render('preview', { type: request.params.type, name: request.params.name });
});
router.get('/reveal', function (request, response, next) {
  response.render('revealPage');
});


module.exports = router;
