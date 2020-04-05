var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport')
var mongoose = require('mongoose');
var cors = require('cors');
var fileUpload = require('express-fileupload');
require('./config/passport-config.js');

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors())
app.use(fileUpload({
  createParentPath: true
}));
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
app.use('/images',require('./routes/images.route'));
app.use('/users',passport.authenticate('jwt',{session:false}),require('./routes/users.route'))

app.use('/socket.io',express.static('node_modules/socket.io-client/dist'))
app.get('/update',(req,res)=>{
  io.on('connect', function (socket) {
    socket.emit('update','an update occured');
  });
  return res.json('succesfully updated');
})

io.on('connect', function (socket) {
  socket.on('page',(name, page)=>{
    console.log(name+' is visitting the '+page+' page.');
  });
});



server.listen(80);

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

module.exports = app;
