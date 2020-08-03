var express = require('express');
var router = express.Router();
var conn = require('../db');

router.get('/login', function (req, res, next) {
  res.render('login');
});
router.get('/login/signup', function (req, res, next) {
  res.render('signup');
});
router.get('/login/profile', function (req, res, next) {
  res.render('profile');
});

router.get("/member", function (request, response) {

  conn.query('select * from member',
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



module.exports = router;
