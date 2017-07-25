var mailgun = require('mailgun-js');

var env = require("./env");

var client = new mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
  timeout: 10000,
  retry: 1
});

exports.client = client;

// Send Email Function
exports.send = function(to, subject, body, callback) {

  if(to == null) return callback(null, null);

  var data = {
    from: '',
    to: to,
    subject: subject,
    html: ''
  }

  data.html = body;

  // Send Email
  client.messages().send(data, function(err, body) {
    if(err) {
      console.log("Mailgun Error: ", err);
      if(typeof callback !== "undefined") {
        return callback(err, body);
      } else {
        return false;
      }
    } else {
      console.log("Mailgun Success: ", body);
      if(typeof callback !== "undefined") {
        return callback(err, body);
      } else {
        return true;
      }
    }
  });

}
