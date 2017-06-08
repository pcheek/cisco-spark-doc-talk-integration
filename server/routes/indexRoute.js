/*
 *  This file contains the endpoint for our homepage.
 *
 */

const express = require('express');
const router = express.Router();

const db = require('../../modules/db');

module.exports = router.get('/', function(req, res) {
  if(!req.user) return res.redirect('/login');
  var message = null;
  if(req.query.message) message = req.query.message;
  db.User.findOne({
    _id: req.user._id
  }).exec(function(err, user) {
    if(err) {
      message = "There was an error finding your user account in our system.";
      console.log("Error fetching user account from database.", err);
    }
    user.getRooms(function(err, rooms, room) {
      if(err) {
        message = "There was an error fetching your rooms from Cisco.";
        console.log("Error fetching user's rooms.", err);
      }
      if(err || !rooms) rooms = [];
      return res.render('index', {
        user: req.user,
        room: room,
        rooms: rooms,
        message: message,
        integration_is_paypal: process.env.INTERNAL_CISCO_SPARK_INTEGRATION_ID === 'paypal',
        integration_is_webhook: process.env.INTERNAL_CISCO_SPARK_INTEGRATION_ID === 'webhook'
      });
    });
  });
});
