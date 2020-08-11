var express = require('express');
var router = express.Router();
var conn = require('../db');

router.get('/', function (req, res, next) {
  console.log("hello", res.locals.uName);
  if (res.locals.uName != undefined && res.locals.uName != "Guest") {
    console.log("user : ", res.locals.uName);
    res.render("index", { uName: res.locals.uName });
  } else {
    console.log("Guest : ", res.locals.uName);
    res.locals.uName = "Guest";
    res.render("index");
  }
});

router.post("/", function (request, response) {
  console.log('sssssssssssssssssss');
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

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/features', function (req, res, next) {
  res.render('featuresPage');
});
router.get('/officalTemplat', function (req, res, next) {
  conn.query('select * from template',
  function (err, rows) {
    if (err) throw err;
    res.render('templatePage', { template: rows });
  });
});
router.get('/officalTemplat/:type/:name', function (req, res, next) {
  console.log(req.params.type);
  res.render('preview', { type: req.params.type, name: req.params.name });
});
router.get('/reveal', function (req, res, next) {
  res.render('revealPage');
});


module.exports = router;
