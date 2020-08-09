var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require("express-session");
var conn = require('./db');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var editRouter = require('./routes/edit');

var app = express();

app.use(session({
  secret: 'i9wcou8ls64klewsfds',
  resave: true,
  saveUninitialized: true,

  cookie: {
    path: '/',
    httpOnly: true,
    secure: false,
    maxAge: 10 * 60 * 1000
  }
}));

app.use(function (req, res, next) {
  // console.log(res.locals.uName);
  if (!res.locals.uName) {
    res.locals.uName = 'Guest';
  }
  // console.log(res.locals.uName);

  next();
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

process.on('uncaughtException', function (err) {
  console.log(err);
});
app.use(logger('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// db state
app.use(function (req, res, next) {
  req.conn = conn;
  next();
});

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/edit', editRouter);

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
