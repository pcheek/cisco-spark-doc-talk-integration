/*
 *  This file contains the endpoint for our logout page.
 *
 */

const express = require('express');
const router = express.Router();

module.exports = router.get('/', function(req, res) {
  req.logout();
  return res.redirect('/');
});
