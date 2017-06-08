/*
 *  This file contains the endpoint for our login page.
 *
 */

const express = require('express');
const router = express.Router();

module.exports = router.get('/', function(req, res) {
  if(req.user) return res.redirect('/');
  return res.render('login', {
    integration_is_paypal: process.env.INTERNAL_CISCO_SPARK_INTEGRATION_ID === 'paypal',
    integration_is_webhook: process.env.INTERNAL_CISCO_SPARK_INTEGRATION_ID === 'webhook'
  });
});
