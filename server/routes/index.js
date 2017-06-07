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

const paypalIpnWebhookRoute = router.use('/paypal/ipn', require('./paypalIpnWebhookRoute'));

module.exports = {
  indexRoute,
  loginRoute,
  logoutRoute,
  authSparkRoute,
  authSparkCallbackRoute,
  roomsRoute,
  paypalIpnWebhookRoute
};
