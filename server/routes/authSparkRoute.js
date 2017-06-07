/*
 *  This file contains the endpoint for our Spark auth page.
 *
 */

const express = require('express');
const router = express.Router();

const passport = require('../../modules/passport');

module.exports = router.get('/',
  passport.passport.authenticate('cisco-spark'),
  function(req, res) {
});
