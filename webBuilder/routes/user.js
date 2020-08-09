var express = require('express');
var router = express.Router();
var conn = require('../db');
var { login_render, login_api } = require('../middleware/login')

//登入
router.get('/login', function (req, res, next) {
  res.render('login');
});

// router.post('/login', function (req, res) {
//   var sql = `SELECT * FROM member WHERE uEmail=? and uPwd=?;`
//   var data = [req.body.account, req.body.password]
//   conn.exec(sql, data, function (results, fields) {
//     if (results[1]) {
//       req.session.user = {
//         id: results[1].id,
//         account: results[1].account,
//         rights: results[1].rights,
//         updated_at: results[1].updated_at
//       }
//       res.end(
//         JSON.stringify(new Success('login success'))
//       )
//     } else {
//       res.end(
//         JSON.stringify(new Error('login failed'))
//       )
//     }
//   })
// })

router.get('/logout', function (req, res, next) {
  res.locals.uName="Guest";
  res.redirect('/'); 
});

router.get('/signup', function (req, res, next) {
  res.render('signup');
});

router.get("/", function (request, response) {
  conn.query('select * from member',
    '',
    function (err, rows) {
      if (err) {
        console.log(JSON.stringify(err));
        response.render('profile');
      }
      response.render('profile', { member: rows });
    }
  );

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
