var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var post_lists = require('./routes/posts_list.js')

var db = require('sqlite')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', post_lists);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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



Promise.resolve()
.then(() => {
  return db.open('./db.sqlite', {Promise})
})
.then(() => {
  return db.run("CREATE TABLE IF NOT EXISTS POSTS(_id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, contents TEXT, name TEXT, pw TEXT, date TEXT)")
})
.then(() => {
  return db.run("CREATE TABLE IF NOT EXISTS COMMENTS(_id INTEGER PRIMARY KEY AUTOINCREMENT, contents TEXT, name TEXT, pw TEXT, post_id INTEGER, date TEXT)")
})
.catch(err => console.error(err.stack))


module.exports = app;
