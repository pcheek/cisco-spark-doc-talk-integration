/*
 *  This module initializes the Mongoose library to connect to and interact with
 *  our database server.
 */

// Initialize Mongoose
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var env = require('./env');

// Connect to Database
// Set Options for Connection
// https://gist.github.com/mongolab-org/9959376
var options = {
  server: {
    socketOptions: {
      keepAlive: 300000,
      connectTimeoutMS: 30000
    }
  },
  replset: {
    socketOptions: {
      keepAlive: 300000,
      connectTimeoutMS : 30000
    }
  }
};

console.log("Connecting to MongoDB", { MONGOLAB_URI: process.env.MONGOLAB_URI });
mongoose.connect(process.env.MONGOLAB_URI, options);

// Mongoose Connected Listener
mongoose.connection.on('connected', function () {
  console.log('Connected to MongoDB');
});

// Mongoose Error Listener
mongoose.connection.on('error', function (err) {
  console.log('MongoDB Connection Error: ' + err);
});

// Mongoose Disconnected Listener
mongoose.connection.on('disconnected', function () {
  console.log('MongoDB Disconnected');
});

// App Termination Listener
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('MongoDB Disconnected via App Termination');
    process.exit(0);
  });
});

// Export Database Models
exports.User = require("../models/User.js").User;

exports.mongoose = mongoose;
