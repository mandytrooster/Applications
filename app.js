var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');
const {Client} = require('pg');


const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});
var highscoreRouter = require('./routes/highscore');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var scoreRouter = require('./routes/scoreHandler');

var app = express();

// testing postgress connection
//client.connect();
//client.query('SELECT * FROM SCORES;', (err, res) => {
//  if (err) throw err;
//  for (let row of res.rows) {
//    console.log(JSON.stringify(row));
//  }
//  client.end();
//});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', highscoreRouter);
app.use('/users', usersRouter);
app.use('/newscore', scoreRouter);

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
