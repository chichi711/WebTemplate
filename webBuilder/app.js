var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require("express-session");

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var editRouter = require('./routes/edit');

var app = express();
var mysql = require("mysql");

// 登入sql
var conn = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'eeweb'
});

conn.connect(function (err,rows) {
	if (err) {
		console.log(JSON.stringify(err));
		return;
	}
console.log("isFine")
});

// 添加路由並以JSON格式顯示
app.get("/EEweb/member", function (req, res) {
  conn.query('select * from member','',function (err, rows) {
          if (err) {
              console.log(JSON.stringify(err));
              return;
          }
          res.send(JSON.stringify(rows));
      }
  );
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// db state
app.use(function(req, res, next) {
  req.conn = conn;
  next();
});

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/edit', editRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
