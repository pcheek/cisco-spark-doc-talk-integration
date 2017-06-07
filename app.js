const express = require('express');
const path = require('path');
const _ = require('lodash');
const async = require('async');
const exphbs = require('express-handlebars');

const email = require('./modules/email');
const db = require('./modules/db');

const routes = require('./server/routes');

const { globalMiddlewares } = require('./server/globalMiddleware');

const app = express();

app.disable('etag');

// Global Middleware Handlers
app.use(globalMiddlewares, _.values(routes));

// View Engine Setup
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  helpers: {
    domain: process.env.DOMAIN,
    // http://stackoverflow.com/questions/8853396/logical-operator-in-a-handlebars-js-if-conditional
    ifCond: function (v1, operator, v2, options) {
      // This function provides conditional functionality in Handlebars templates.
      switch (operator) {
        case '==':
          return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
          return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '<':
          return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
          return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
          return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
          return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
          return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
          return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
          return options.inverse(this);
      }
    }
  },
}));
app.set('view engine', 'handlebars');

// Static files
app.use('/public', express.static(path.join(__dirname, 'public')));

// Catch Not Found and Forward to Error Handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error Handlers

// Development Error Handler (Prints Stack Trace)
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      pageTitle: 'Page Not Found',
      message: err.message,
      error: err,
    });
  });
}

// Production Error Handler (Omits Stack Trace)
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    pageTitle: 'Page Not Found',
    message: err.message
  });
});

module.exports = app;
