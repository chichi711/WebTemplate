var express = require('express');
var router = express.Router();
var conn = require('../db');
const e = require('express');
const { render } = require('../app');
const app = require('../app');

// app.post('/upload', function (req, res) {
//   //接收前臺POST過來的base64
//   var imgData = req.body.imgData;
//   //過濾data:URL
//   var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
//   var dataBuffer = new Buffer(base64Data, 'base64');
//   fs.writeFile("image.png", dataBuffer, function (err) {
//     if (err) {
//       res.send(err);
//     } else {
//       res.send("儲存成功！");
//     }
//   });
// });

//會員登入
router.post("/login", function (request, response) {
  const output = {
    success: true,
    body: request.body
  }
  // console.log('----------------------');
  // console.log(request.body.Email);
  // console.log(request.body.Email);
  conn.query(
    'SELECT * FROM member where email = ?',
    [request.body.Email],
    function (err, rows) {
      // console.log('rows : ', rows);
      if (err || request.body.uPwd != rows[0].uPwd) {
        // console.log(JSON.stringify(err));
        return;
      } else {
        console.log(rows[0].uName);
        request.session.uName = rows[0].uName;
        console.log(request.session.uName);
        // console.log('res.locals.uName ==> post ==> ', request.session.uName);
      }
      // response.locals.uName = rows[0].uName;

    });
    response.json(output);
  // response.redirect("index");
  // response.render("index",{deta:request.session.uName})
  // response.sendStatus(200);

})



//判斷狀態
router.get('/', function (request, response, next) {
  console.log(request.session.uName);
  // console.log('res.locals.uName ==> get ==> ', req.session.uName);

  // if (res.locals.uName != undefined && res.locals.uName != "Guest") {
  //   // console.log("user : ", res.locals.uName);
  //   res.render("index", { uName: res.locals.uName });
  // } else {
    // console.log("Guest : ", res.locals.uName);
    // res.locals.uName = "Guest";
    response.render("index");
  // }
});


// router.get('/', function (req, res, next) {
//   res.render('index', { title: 'Express' });
// });
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

// router.get('/officalTemplat/preview', function (req, res, next) {
//   res.render('preview');
// });
// router.get('/officalTemplat/preview_b', function (req, res, next) {
//   res.render('preview_b');
// });


module.exports = router;
