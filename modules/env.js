/*
 *  This file contains default values for all of the environment variables.
 *  These values are only used in development - production values are set in
 *  the actual production environment.
 */

 if(!process.env.INTERNAL_CISCO_SPARK_INTEGRATION_ID)
   process.env.INTERNAL_CISCO_SPARK_INTEGRATION_ID = 'paypal';
if(!process.env.TZ)
  process.env.TZ = 'UTC';
if(!process.env.MONGOLAB_URI)
  process.env.MONGOLAB_URI = process.env.MONGODB_MONGOLAB_URI || 'mongodb://localhost:27017/cisco-spark-paypal-integration';
if(!process.env.NODE_ENV)
  process.env.NODE_ENV = 'development';

if(process.env.INTERNAL_CISCO_SPARK_INTEGRATION_ID == 'paypal') {
  if(!process.env.INTERNAL_CISCO_SPARK_INTEGRATION_TITLE)
    process.env.INTERNAL_CISCO_SPARK_INTEGRATION_TITLE = 'PayPal';
  if(!process.env.INTERNAL_CISCO_SPARK_INTEGRATION_DESCRIPTION)
    process.env.INTERNAL_CISCO_SPARK_INTEGRATION_DESCRIPTION = 'The Cisco Spark PayPal Integration provides instant payment notifications for PayPal payments within Cisco Spark.';
  if(!process.env.INTERNAL_CISCO_SPARK_INTEGRATION_LOGIN_TEXT)
    process.env.INTERNAL_CISCO_SPARK_INTEGRATION_LOGIN_TEXT = 'When you setup the Cisco Spark PayPal Integration you will receive instant payment notifications for activity in your PayPal account directly within Cisco Spark. Setup is simple and we are here to help you if you need assistance or have questions.';
  if(!process.env.DOMAIN)
    process.env.DOMAIN = 'cisco-spark-paypal-integration.ngrok.io';
  if(!process.env.CISCOSPARK_CLIENT_ID)
    process.env.CISCOSPARK_CLIENT_ID = 'C6bbf37e3dbcef0ea926cb53fbf9a57f485c2e12636ffdf4780b8e66a14013562';
  if(!process.env.CISCOSPARK_CLIENT_SECRET)
    process.env.CISCOSPARK_CLIENT_SECRET = 'cbf533d3ae555c32506daecbe23146d2e1e47c0f97d1eab685229edb2b9c17dc';
  if(!process.env.PAYPAL_IPN_VERIFICATION_URL)
    process.env.PAYPAL_IPN_VERIFICATION_URL = 'https://www.sandbox.paypal.com/cgi-bin/webscr';
}

if(process.env.INTERNAL_CISCO_SPARK_INTEGRATION_ID == 'webhook') {
  if(!process.env.INTERNAL_CISCO_SPARK_INTEGRATION_TITLE)
    process.env.INTERNAL_CISCO_SPARK_INTEGRATION_TITLE = 'Webhooks';
  if(!process.env.INTERNAL_CISCO_SPARK_INTEGRATION_DESCRIPTION)
    process.env.INTERNAL_CISCO_SPARK_INTEGRATION_DESCRIPTION = 'The Cisco Spark Webhook Integration provides instant API-driven alert notifications for your system within Cisco Spark.';
  if(!process.env.INTERNAL_CISCO_SPARK_INTEGRATION_LOGIN_TEXT)
    process.env.INTERNAL_CISCO_SPARK_INTEGRATION_LOGIN_TEXT = 'When you setup the Cisco Spark Webhooks Integration you will receive instant API-driven alert notifications for activity you define directly within Cisco Spark. Setup is simple and we are here to help you if you need assistance or have questions.';
  if(!process.env.DOMAIN)
    process.env.DOMAIN = 'cisco-spark-paypal-integration.ngrok.io';
  if(!process.env.CISCOSPARK_CLIENT_ID)
    process.env.CISCOSPARK_CLIENT_ID = 'C7404715ab58cdd218fef812947be8f48f5957a9c0ec5e2b5b64389c83c43eee4';
  if(!process.env.CISCOSPARK_CLIENT_SECRET)
    process.env.CISCOSPARK_CLIENT_SECRET = '23814ea8bc3c92f7bbdb7889fc267ccfdc4caba08c7c975669c21bf0fdfd01b4';
}

if(!process.env.CISCOSPARK_REDIRECT_URI)
  process.env.CISCOSPARK_REDIRECT_URI = 'https://' + process.env.DOMAIN + '/auth/spark/callback';
if(!process.env.CISCOSPARK_SCOPE)
  process.env.CISCOSPARK_SCOPE = JSON.stringify([
    'spark:people_read',
    'spark:rooms_read',
    'spark:rooms_write',
    'spark:messages_write'
  ]);
