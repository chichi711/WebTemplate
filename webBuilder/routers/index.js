var express = require('express');
var router = express.Router();
var conn = require('../db');


// router.get('/', function (request, response, next) {
//   // console.log("hello", response.locals.uName);
//   if (response.locals.uName != undefined && response.locals.uName != "Guest") {
//     console.log("getuser : ", response.locals.uName);
//     response.render("index", { uName: response.locals.uName });
//   } else {
//     console.log("getGuest : ", response.locals.uName);
//     response.locals.uName = "Guest";
//     response.render("index");
//   }
// });


router.get('/', function (request, response, next) {
  // console.log("hello", response.locals.uName);
  // if (request.session.uName != undefined && request.session.uName != "Guest") {
  //   console.log("user : ", request.session.uName);
  //   response.render("index", { uName: request.session.uName });
  // } else {
    console.log("Guest : ", request.session.uName);
    // response.locals.uName = "Guest";
    response.render("index");
  // }
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
router.get('/officalTemplat/:type/:name', function (request, response) {
  console.log(request.params.type);
  response.render('preview', { type: request.params.type, name: request.params.name });
});
router.get('/reveal', function (request, response, next) {
  response.render('revealPage');
});


module.exports = router;
