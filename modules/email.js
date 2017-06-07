/*
 *  This module initializes the Mailgun email client library. It also provides
 *  some additional methods that wrap the email send function with our branding.
 */

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
    from: process.env.HCE_FROM_EMAIL,
    to: to,
    subject: subject,
    html: ''
  }

  if(body.length > 200) {
    data.html += `<!doctype html>
    <html>
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=no;">
        <title>Work Today</title>
        <style media="all" type="text/css">
        @media all {
          .btn-primary table td:hover {
            background-color: #074F99 !important;
          }
          .btn-primary a:hover {
            background-color: #074F99 !important;
            border-color: #053466 !important;
          }
        }

        @media all {
          .btn-secondary a:hover {
            border-color: #053466 !important;
            color: #ffffff !important;
          }
        }

        @media only screen and (max-width: 620px) {
          table[class=body] h1 {
            font-size: 28px !important;
            margin-bottom: 10px !important;
          }
          table[class=body] h2 {
            font-size: 22px !important;
            margin-bottom: 10px !important;
          }
          table[class=body] h3 {
            font-size: 16px !important;
            margin-bottom: 10px !important;
          }
          table[class=body] p,
          table[class=body] ul,
          table[class=body] ol,
          table[class=body] td,
          table[class=body] span,
          table[class=body] a {
            font-size: 16px !important;
          }
          table[class=body] .wrapper,
          table[class=body] .article {
            padding: 10px !important;
          }
          table[class=body] .content {
            padding: 0 !important;
          }
          table[class=body] .container {
            padding: 0 !important;
            width: 100% !important;
          }
          table[class=body] .header {
            margin-bottom: 10px !important;
          }
          table[class=body] .main {
            border-left-width: 0 !important;
            border-radius: 0 !important;
            border-right-width: 0 !important;
          }
          table[class=body] .btn table {
            width: 100% !important;
          }
          table[class=body] .btn a {
            width: 100% !important;
          }
          table[class=body] .img-responsive {
            height: auto !important;
            max-width: 100% !important;
            width: auto !important;
          }
          table[class=body] .alert td {
            border-radius: 0 !important;
            padding: 10px !important;
          }
          table[class=body] .span-2,
          table[class=body] .span-3 {
            max-width: none !important;
            width: 100% !important;
          }
          table[class=body] .receipt {
            width: 100% !important;
          }
        }

        @media all {
          .ExternalClass {
            width: 100%;
          }
          .ExternalClass,
          .ExternalClass p,
          .ExternalClass span,
          .ExternalClass font,
          .ExternalClass td,
          .ExternalClass div {
            line-height: 100%;
          }
          .apple-link a {
            color: inherit !important;
            font-family: inherit !important;
            font-size: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
            text-decoration: none !important;
          }
        }
        </style>
      </head>
      <body class="" style="font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #f6f6f6; margin: 0; padding: 0;">
        <table border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background-color: #f6f6f6;" width="100%" bgcolor="#f6f6f6">
          <tr>
            <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
            <td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; Margin: 0 auto !important; max-width: 90%; padding: 10px; width: 580px;" valign="top">
              <div class="content" style="box-sizing: border-box; display: block; Margin: 0 auto; max-width: 90%; padding: 10px;">

                <!-- START CENTERED WHITE CONTAINER -->
                <span class="preheader" style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">You have a new message from Work Today.</span>

                <br/>

                <div style="text-align: center;">
                  <img src="https://d3bebahtflxvhp.cloudfront.net/assets/img/logo.png" style="width: 250px; max-width: 75%;" alt="Work Today" />
                </div>

                <br/>

                <table class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background: #fff; border-radius: 4px;" width="100%">

                  <!-- START MAIN CONTENT AREA -->
                  <tr>
                    <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;" valign="top">
                      <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" width="100%">
                        <tr>
                          <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">
                          `;
  }

  data.html += body;

  if(body.length > 200) {
    data.html += `
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- END MAIN CONTENT AREA -->
                  </table>

                <!-- START FOOTER -->
                <div class="footer" style="clear: both; padding-top: 10px; text-align: center; width: 100%;">
                  <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" width="100%">
                    <tr>
                      <td class="content-block" style="font-family: sans-serif; vertical-align: top; padding-top: 10px; padding-bottom: 10px; font-size: 10px; color: #999999; text-align: center;" valign="top" align="center">
                        You are receiving this message because you signed up for a service from Work Today.<br/>
                        <br/>
                        This email was sent from a notification-only address that cannot accept incoming mail.<br/>
                        Please do not reply to this message. You can email us at <a href="mailto:info@worktoday.com" style="color: #999999 !important; text-decoration: none !important;">info@worktoday.com</a><br/>
                        <br/>
                        <br/>
                        Work Today Inc.<br/>
                        <span class="apple-link" style="color: #999999; font-size: 10px; text-align: center;">520 Broadway, Suite 200, Santa Monica, CA 90401</span>

                      </td>
                    </tr>
                  </table>
                </div>

                <!-- END FOOTER -->

                <!-- END CENTERED WHITE CONTAINER -->
              </div>
            </td>
            <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
          </tr>
        </table>
      </body>
    </html>
    `;
  }

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
