var express = require('express');
var router = express.Router();
var events = require(`events`);
var emitter = new events.EventEmitter();
var conn = require('../db');
const { request } = require('http');

router.get('/login', function (req, res, next) {
  res.render('login');
});
router.get('/login/signup', function (req, res, next) {
  res.render('signup');
});
router.get('/login/profile', function (req, res, next) {
  res.render('profile');
});

//    監聽資料庫寫入返回的引數
emitter.on("ok", function () {
  return res.end("註冊成功");    //    向前臺返回資料
});
emitter.on("false", function () {
  return res.end("使用者名稱已存在");    //    向前臺返回資料
});
router.get("/member", function (request, response) {

  conn.query('select * from member','',function (err, rows) {
      if (err) {
        console.log(JSON.stringify(err));
        return;
      }
      response.send(JSON.stringify(rows));
    }
  );

})
// 註冊
router.post("/member", function (request, response) {

  conn.query(
    "insert into member set uName = ?,Email = ?, uPwd = ?",
    [
      request.body.uName,
      request.body.Email,
      request.body.uPwd
    ]);
  response.send("row inserted.");

})

// 登入驗證
// router.get("/member", function (req, res) {

//   var sql = "select * from member where Email=`" + req.query.username + "` and ePwd =`" + reqt.query.password + "`";
//   connection.query(sql, function (err, res) {

//     if (result.length == 0) {
//       res.end("使用者名稱密碼不正確");    //資料庫裡面沒找到配對的內容返回引數
//     } else {
//       res.end("登陸成功");    //返回登入成功
//     }
//   })
// });
module.exports = router;
