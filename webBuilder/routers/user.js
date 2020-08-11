var express = require('express');
var router = express.Router();
var conn = require('../db');

router.get("/", function (request, response) {
  conn.query('select m.mID,uName,Email,uPwd,img,a.aID,aName,explanation,pic,pName,body from (member m join account a on m.mId=a.mID ) join pages p on a.aID = p.aID WHERE m.mid = 1',
    '',
    function (err, rows) {
      if (err) {
        console.log(JSON.stringify(err));
        response.render('profile');
      }
      conn.query('select mID, uName, Email, uPwd, img from member WHERE mid = 1',
        '',
        function (err, member) {
          if (err) {
            console.log(JSON.stringify(err));
            response.render('profile');
          }
          console.log('uname', rows[0]);
          response.render('profile', { member: member, db: rows, uName: request.body.uName, eMail: request.body.eMail, pwd: request.body.uPwd });
        }
      );
    }
  );

});
router.post("/", function (request, response) {
  console.log('www');
  request.session.userName = request.body.uName;
  request.session.userName = request.body.eMail;
  request.session.userName = request.body.uPwd;
  conn.query(
    "update member set uName = ?,Email = ?, uPwd = ? where mID = 1",
    [
      request.body.uName,
      request.body.eMail,
      request.body.uPwd
    ]);
  console.log('qqq');
    // response.redirect('/user');
    // response.location('/user');
});

router.get('/login', function (req, res, next) {
  res.render('login');
});
router.get('/signup', function (req, res, next) {
  res.render('signup');
});
// 註冊
router.post("/signup", function (request, response) {
  console.log('qq');
  conn.query(
    "insert into member set uName = ?,Email = ?, uPwd = ?",
    [
      request.body.uName,
      request.body.Email,
      request.body.uPwd
    ]);
});


module.exports = router;
