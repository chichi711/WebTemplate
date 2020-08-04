var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require("express-session");
var cookieParser = require('cookie-parser');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// app引入demo.js ,後見93
var demoRouter = require('./routes/demo');

var app = express();
var mysql = require("mysql");

app.use(cookieParser());
app.use(session({
  secret: "xxcalfdlsajfdksaj",
  saveUninitialized: false,
  resave: true
}));
app.use(function (req, res, next) {
  if (!req.session.userName) {
    req.session.userName = "Guest";
  }
  next();
});
// 登入sql
var conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'eeweb'
});

conn.connect(function (err, rows) {
  if (err) {
    console.log(JSON.stringify(err));
    return;
  }
  console.log("isFine")
});

// app.get("/home/news", function (request, response) {

//   connection.query('select * from news',
//       '',
//       function (err, rows) {
//           if (err) {
//               console.log(JSON.stringify(err));
//               return;
//           }

//           response.send(JSON.stringify(rows));
//       }
//   );

// })


// conn.query('select * from member','',function (err, rows) {
//           if (err) {
//               console.log(JSON.stringify(err));
//               return;
//           }
//           console.log(JSON.stringify(rows));
//       }
//   );

// 添加路由並以JSON格式顯示
app.get("/EEweb/member", function (req, res) {
  conn.query('select * from member', '', function (err, rows) {
    if (err) {
      console.log(JSON.stringify(err));
      return;
    }
    res.send(JSON.stringify(rows));
  }
  );
})
app.get("/test", function (req, res) {
  conn.query('select * from member', '', function (err, rows) {
    if (err) {
      console.log(JSON.stringify(err));
      return;
    }
    res.send(JSON.stringify(rows));
  }
  );
})
// 確認連線
// conn.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   conn.query(`select * from member`,function(err,result){
//     if(err) throw err;
//     console.log("result:"+result)
//   })
// });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// db state
app.use(function (req, res, next) {
  req.conn = conn;
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
//catch demo.js路由
app.use('/demo', demoRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
