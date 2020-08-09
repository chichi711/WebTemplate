var express = require('express');
var router = express.Router();
var conn = require('../db');

router.get('/', function (req, res, next) {
    if (req.session.uName != undefined && req.session.uName != "Guest") {
      console.log("user : ", req.session.uName);
      res.render("index", { uName: req.session.uName });
  }  else{
    console.log("Guest : ", req.session.uName);
    req.session.uName = "Guest";
    res.render("index");

  }
  });

  router.post("/", function (request, response) {
    console.log('sssssssssssssssssss');
    conn.query('SELECT * FROM member where email = ?',
    [request.body.Email],
    function (err, rows) {
      console.log('rows : ', rows);
        if (err || request.body.uPwd != rows[0].uPwd) {
            console.log(JSON.stringify(err));
            return;
        }
        req.session.uName = rows[0].uName;
        console.log('req.session.uName',req.session.uName);
    });
    res.render("index");
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


module.exports = router;
