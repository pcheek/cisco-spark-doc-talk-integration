const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoStore = require('connect-mongo')(session);
const logger = require('morgan');

const db = require('../modules/db');
const passport = require('../modules/passport');

// Cookies
const cookieMiddleware = cookieParser();

// Sessions
const sessionMiddleware = session({
  secret: 'd8$br2f_3%a',
  maxAge: new Date(Date.now() + 3600000),
  store: new mongoStore({ mongooseConnection: db.mongoose.connection }), // eslint-disable-line
  resave: true,
  saveUninitialized: true,
});

// Setup Passport
const passportMiddleware = passport.passport.initialize();
const passportSessionMiddleware = passport.passport.session();

// JSON Raw Body Parser
const bodyParserJson = function(req, res, next) {
  var data = '';
  req.on('data', function(chunk) {
    data += chunk;
  });
  req.on('end', function() {
    req.rawBody = data;
  });
  next();
}

// Initialize Middleware
module.exports.globalMiddlewares = [
    cookieMiddleware,
    sessionMiddleware,
    passportMiddleware,
    passportSessionMiddleware,
    bodyParserJson,
    bodyParser.json(),
    bodyParser.urlencoded({ extended: false }),
];
