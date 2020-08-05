var express = require('express');
var router = express.Router();
var conn = require('../db');

router.get('/login', function (req, res, next) {
  res.render('login');
});
router.get('/signup', function (req, res, next) {
  res.render('signup');
});

router.get("/", function (request, response) {
  // conn.query('select * from member',
  //     '',
  //     function (err, rows) {
  //         if (err) {
  //             console.log(JSON.stringify(err));
  //             return;
  //         }
  //         response.render('profile', { member: rows});
          response.render('profile');
  //     }
  // );

})
// 註冊
router.post("/", function (request, response) {
  console.log('qq');
	conn.query(
		"insert into member set uName = ?,Email = ?, uPwd = ?",
			[
				request.body.uName,
				request.body.Email,
				request.body.uPwd
			]);
})


module.exports = router;
