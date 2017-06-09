/*
 *  This file contains the endpoint for our homepage.
 *
 */

const express = require('express');
const router = express.Router();

const db = require('../../modules/db');

module.exports = router.get('/', function(req, res) {
  return res.render('integrations');
});
