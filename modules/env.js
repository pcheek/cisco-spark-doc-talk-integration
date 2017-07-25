/*
 *  This file contains default values for all of the environment variables.
 *  These values are only used in development - production values are set in
 *  the actual production environment.
 */

 if(!process.env.INTERNAL_CISCO_SPARK_INTEGRATION_ID)
   process.env.INTERNAL_CISCO_SPARK_INTEGRATION_ID = 'doctalk';
if(!process.env.TZ)
  process.env.TZ = 'UTC';
if(!process.env.MONGOLAB_URI)
  process.env.MONGOLAB_URI = process.env.MONGODB_MONGOLAB_URI || 'mongodb://localhost:27017/cisco-spark-paypal-integration';
if(!process.env.NODE_ENV)
  process.env.NODE_ENV = 'development';

if(!process.env.INTERNAL_CISCO_SPARK_INTEGRATION_TITLE)
  process.env.INTERNAL_CISCO_SPARK_INTEGRATION_TITLE = 'Doc Talk';
if(!process.env.INTERNAL_CISCO_SPARK_INTEGRATION_DESCRIPTION)
  process.env.INTERNAL_CISCO_SPARK_INTEGRATION_DESCRIPTION = 'Doc Talk connects you with experienced health professionals for virtual consultations.';
if(!process.env.INTERNAL_CISCO_SPARK_INTEGRATION_LOGIN_TEXT)
  process.env.INTERNAL_CISCO_SPARK_INTEGRATION_LOGIN_TEXT = 'Don\'t have a primary care doctor or need help remotely right now?<br/><br/>Doc Talk can connect you with a health professional quickly for only $5/minute.<br/><br/>Chat live with our health professionals via chat, voice, and video using Cisco Spark';
if(!process.env.DOMAIN)
  process.env.DOMAIN = 'cisco-spark-paypal-integration.ngrok.io';
if(!process.env.CISCOSPARK_CLIENT_ID)
  process.env.CISCOSPARK_CLIENT_ID = 'C039c5703432105e187a2e16fcc99ae54500077cd60b56240042a920a21873e6a';
if(!process.env.CISCOSPARK_CLIENT_SECRET)
  process.env.CISCOSPARK_CLIENT_SECRET = '3f023722b08c7c78ae3dea759488780624b068c85b32db712383bfe20a4f2a0e';

if(!process.env.CISCOSPARK_REDIRECT_URI)
  process.env.CISCOSPARK_REDIRECT_URI = 'https://' + process.env.DOMAIN + '/auth/spark/callback';
if(!process.env.CISCOSPARK_SCOPE)
  process.env.CISCOSPARK_SCOPE = JSON.stringify([
    'spark:all'
  ]);
