var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport')
var mongoose = require('mongoose');
var request = require('request');

require('./config/passport-config.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology:true});
app.use(passport.initialize());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index.route'));
app.use('/auth',require('./routes/auth.route'));

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
  res.json(err);
});

baseUrl = 'https://api.imagga.com/v2/tags?image_url='
apiKey = 'acc_0dbc8dcbf0a181a';
apiSecret = '69f2658b95f1293390d95967dbf52ad0';
imageUrl = 'https://docs.imagga.com/static/images/docs/sample/japan-605234_1280.jpg';

request.get(baseUrl+imageUrl,
 function (error, response, body) {
  console.log('Status:', response.statusCode);
  console.log('Headers:', JSON.stringify(response.headers));
  console.log('Response:', body);
}).auth(apiKey, apiSecret, true);


module.exports = app;
