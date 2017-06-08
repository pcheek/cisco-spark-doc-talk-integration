/*
 *  This file contains the endpoint for our PayPal IPN webhook route.
 *
 */

const express = require('express');
const router = express.Router();
const request = require('request');

const db = require('../../modules/db');

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

        var body = 'cmd=_notify-validate&' + req.rawBody;

        var options = {
          url: process.env.PAYPAL_IPN_VERIFICATION_URL,
          method: 'POST',
          headers: {
            'Connection': 'close'
          },
          body: body,
          strictSSL: true,
          rejectUnauthorized: false,
          requestCert: true,
          agent: false
        };

        request(options, function callback(error, response, body) {
          if(!error && response.statusCode === 200) {
            if (body.substring(0, 8) === 'VERIFIED') {
              var notificationString = '';
              if(req.body.payment_status) notificationString += req.body.payment_status + ' ';
              notificationString += 'Payment: ';
              if(req.body.first_name) notificationString += req.body.first_name + ' ';
              if(req.body.last_name) notificationString += req.body.last_name + ' ';
              if(req.body.payer_email) notificationString += '(' + req.body.payer_email + ') ';
              if(req.body.mc_gross_1) notificationString += 'for ';
              if(req.body.mc_currency) {
                if(req.body.mc_currency == 'USD') {
                  notificationString += '$';
                } else {
                  notificationString += req.body.mc_currency + ' ';
                }
              }
              if(req.body.mc_gross_1) notificationString += req.body.mc_gross_1 + ' ';
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
                console.error("Error sending new IPN message to Cisco Spark.", err);
                res.status(500);
                return res.end();
              });
            } else if (body.substring(0, 7) === 'INVALID') {
              console.error("Invalid IPN detected during PayPal IPN validation.");
              res.status(500);
              return res.end();
            } else {
              console.error("Unexpected response received when validing PayPal IPN data.");
              res.status(500);
              return res.end();
            }
          } else {
            console.error("Error or unexpected response received when validing PayPal IPN data.");
            res.status(500);
            return res.end();
          }
        });
      }
    }
  });
});
