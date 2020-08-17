var express = require('express');
var router = express.Router();
var conn = require('../db');

router.get("/", function (request, response) {
  if (request.session.uName == 'Guest') {
    response.redirect('/user/login');
  } else {
    conn.query('select m.mID,uName,Email,uPwd,img,a.aID,aName,explanation,pic,pName,body from (member m join account a on m.mId=a.mID ) join pages p on a.aID = p.aID WHERE m.mid = ?',
      [request.session.mID],
      function (err, rows) {
        if (err) {
          console.log(JSON.stringify(err));
          response.render('profile');
        }
        conn.query('select mID, uName, Email, uPwd, img from member WHERE mid = ?',
        [request.session.mID],
          function (err, member) {
            if (err) {
              console.log(JSON.stringify(err));
              response.render('profile');
            }
            console.log('uname', rows[0]);
            response.render('profile', { member: member, db: rows, uName: request.body.uName, eMail: request.body.eMail, pwd: request.body.uPwd });
          });
      });
  }
});


router.post("/", function (request, response) {
  //更新會員資料
  request.session.uName = request.body.uName;
  request.session.eMail = request.body.eMail;
  conn.query(
    "update member set img = ?, uName = ?, Email = ?, uPwd = ? where mID = ?",
    [
      request.body.picture,
      request.body.uName,
      request.body.eMail,
      request.body.uPwd,
      request.session.mID
    ]);
  response.redirect('/user');
});

router.get('/login', function (request, response, next) {
  if(request.session.loginerr == 1) {
    request.session.loginerr = 0;
    response.render('login', { err: '帳密輸入錯誤' });
  } else if(request.session.loginerr == 2){
    request.session.loginerr = 0;
    response.render('login', { err: '請輸入帳密' });
  } else {
    response.render('login', { err: 1 });
  }
});

router.post("/login", function (request, response) {
  if (request.body.email != '') {
    conn.query(
      'SELECT * FROM member where email = ?',
      [request.body.email],
      function (err, rows) {
        if (err || rows[0] === undefined || request.body.pwd != rows[0].uPwd ) {
          console.log(JSON.stringify(err));
          request.session.loginerr = 1;
          response.redirect('/user/login');
          return;
        } else {
          request.session.mID = rows[0].mID;
          request.session.uName = rows[0].uName;
          response.redirect('/');
        }
      });
  } else {
    request.session.loginerr = 2;
    response.redirect('/user/login');
  }
});

router.get('/logout', function (request, response, next) {
  request.session.uName = 'Guest';
  response.redirect('/');
});

router.get('/signup', function (request, response, next) {
  response.render('signup');
});
// 註冊
router.post("/signup", function (request, response) {
  conn.query(
    "insert into member set uName = ?,Email = ?, uPwd = ?",
    [
      request.body.uName,
      request.body.Email,
      request.body.uPwd
    ]);
});


module.exports = router;
