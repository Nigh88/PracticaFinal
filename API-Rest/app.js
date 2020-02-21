var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const rabbitConnect = require('./rabbitmq/rabbitConnect')
cookieParser = require('cookie-parser')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

/**
 * Setup de i18n
 */
const i18n = require('./lib/i18nConfigure')();
app.use(i18n.init);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

  next();
});

//Conexion DB
const mongooseConnection = require('./lib/connectMongoose');
require('./models/Anuncio');
require('./models/User');
const loginController = require('./routes/loginController');
const jwtAuth = require('./lib/jwtAuth');
const register = require('./routes/registerController');
const forgotPassword = require('./routes/forgotPassword');
const privateZone = require('./routes/privateZone')
const resetPassword = require('./routes/resetPassword')

app.use('/api/anuncios', require('./routes/api/anuncios'));
app.use('/api/user_anuncios', jwtAuth(), require('./routes/api/anuncios'));
app.post('/api/login', loginController.loginJWT);
app.post('/api/user/register', register.register);
app.post('/api/forgotPassword', forgotPassword.recoverPassword);
app.get('/api/Profile', privateZone.getUserId);
app.put('/api/reset', resetPassword.updatePassword);

app.use('/change-locale', require('./routes/change-locale'));
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
