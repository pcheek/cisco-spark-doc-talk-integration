/*
 *  This file contains the endpoint for our webhook, webhook route.
 *
 */

const express = require('express');
const router = express.Router();
const request = require('request');

const db = require('../../../modules/db');

module.exports = router.post('/:id', function(req, res) {
  db.User.findOne({
    _id: req.params.id
  }).exec(function(err, user) {
    if(err) {
      res.status(500);
      return res.end();
    } else if(!user) {
      res.status(404);
      return res.end();
    } else if(user && !user.cisco_spark_integrations) {
      res.status(400);
      return res.end();
    } else if(user && user.cisco_spark_integrations) {

      var integration = null;
      integration = user.cisco_spark_integrations.filter(function (integration) {
        return integration.cisco_spark_internal_integration_id === process.env.INTERNAL_CISCO_SPARK_INTEGRATION_ID;
      }).pop();

      if(!integration || integration == null) {
        res.status(400);
        return res.end();
      } else {
        var notificationString = 'New empty webhook received.';
        if(req.body.text) notificationString = req.body.text;
        process.env.CISCOSPARK_ACCESS_TOKEN = user.cisco_spark_access_token;
      	const ciscospark = require('ciscospark/env');
        ciscospark.messages.create({
          text: notificationString,
          roomId: integration.cisco_spark_room_id
        }).then(function(message) {
          console.log("message", message);
          res.status(200);
          return res.end();
        }).catch(function(err) {
          console.error("Error sending new webhook message to Cisco Spark.", err);
          res.status(500);
          return res.end();
        });
      }
    }
  });
});
