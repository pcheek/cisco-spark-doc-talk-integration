/*
 *  This file contains an index of all routes.
 *
 */

const router = require('express').Router();

const indexRoute = router.use('/', require('./indexRoute'));

const loginRoute = router.use('/login', require('./loginRoute'));
const logoutRoute = router.use('/logout', require('./logoutRoute'));
const authSparkRoute = router.use('/auth/spark', require('./authSparkRoute'));
const authSparkCallbackRoute = router.use('/auth/spark/callback', require('./authSparkCallbackRoute'));

const roomsRoute = router.use('/rooms', require('./roomsRoute'));

var integrationRoute = null;
if(process.env.INTERNAL_CISCO_SPARK_INTEGRATION_ID == 'paypal') {
  integrationRoute = router.use('/paypal/ipn', require('./integrations/paypalIpnWebhookRoute'));
}

if(process.env.INTERNAL_CISCO_SPARK_INTEGRATION_ID == 'webhook') {
  integrationRoute = router.use('/webhook/ipn', require('./integrations/webhookWebhookRoute'));
}

module.exports = {
  indexRoute,
  loginRoute,
  logoutRoute,
  authSparkRoute,
  authSparkCallbackRoute,
  roomsRoute,
  integrationRoute
};
