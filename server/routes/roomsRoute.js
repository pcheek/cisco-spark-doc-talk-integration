/*
 *  This file contains the endpoint for our login page.
 *
 */

const express = require('express');
const router = express.Router();

const db = require('../../modules/db');

module.exports = router.get('/:id', function(req, res) {
  if(!req.user) return res.redirect('/login');
  console.log(req.params.id);
  db.User.findOneAndUpdate({
    _id: req.user._id,
    "cisco_spark_integrations.cisco_spark_internal_integration_id": process.env.INTERNAL_CISCO_SPARK_INTEGRATION_ID
  }, {
    $set: {
      cisco_spark_room_id: req.params.id
    }
  }, {
    new: true
  }).exec(function(err, user) {
    var message = "Your Space has been updated.";
    if(err) {
      message = "There was an error updating your default room.";
      console.log("Error updating user's default room in database.", err);
    }
    return res.redirect('/?message=' + message);
  });
});
