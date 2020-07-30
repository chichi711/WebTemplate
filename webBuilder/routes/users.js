var express = require('express');
var router = express.Router();

router.get('/login', function (req, res, next) {
    res.render('login');
});
router.get('/login/signup', function (req, res, next) {
    res.render('signup');
});


router.post('/signup', function (req, res, next) {

    var db = req.con;

    // check userid 重複
    var eeAccount = req.body.eeAccount;
    var qur = db.query('SELECT eeAccount FROM member WHERE eeAccount = ?', eeAccount, function (err, rows) {
        if (err) {
            console.log(err);
        }

        var count = rows.length;
        if (count > 0) {

            var msg = 'eeAccount already exists.';
            res.render('userAdd', { title: 'Add User', msg: msg });

        } else {

            var sql = {
                eeAccount: req.body.eeAccount,
                eePassword: req.body.eePassword,
                eeEmail: req.body.eeEmail
            };


            //console.log(sql);
            var qur = db.query('INSERT INTO member SET ?', sql, function (err, rows) {
                if (err) {
                    console.log(err);
                }
                res.setHeader('Content-Type', 'application/json');
                res.redirect('/');
            });
        }
    });


});
/* GET users listing. */
// router.get('/', function (req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = router;
