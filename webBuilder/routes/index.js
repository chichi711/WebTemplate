var express = require('express');
var router = express.Router();
var conn = require('../db');



router.get('/', function (req, res, next) {
//   if (req.session.uName) {
//     console.log("user");
//     res.render("/", { uName:req.session.uName });

//     return;
    
// }  else{
//   console.log("none");
//   req.session.uName = "none";
  res.render("index");

// }     
});

router.post("/", function (request, response) {
  conn.query('SELECT * FROM member where email = ?',
  '',[request.body.Email],

  function (err, rows) {
      if (err || request.body.uPwd != rows[0].uPwd) {
          console.log(JSON.stringify(err));
          return;
      }
      req.session.uName = rows[0].uName;
  }
); 
			
})

router.get('/features', function (req, res, next) {
  res.render('featuresPage');
});
router.get('/officalTemplat', function (req, res, next) {
  res.render('templatePage');
});
router.get('/preview', function (req, res, next) {
  res.render('previewPage');
});
router.get('/officalTemplat/preview', function (req, res, next) {
  res.render('preview');
});
router.get('/officalTemplat/preview_b', function (req, res, next) {
  res.render('preview_b');
});


module.exports = router;


// console.log(req.session.useraccount_login);
// res.redirect("member_myedit");