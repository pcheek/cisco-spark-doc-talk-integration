const passport = require('passport');
const CiscoSparkStrategy = require('../node_modules_modified/passport-cisco-spark/lib/index').Strategy;

const env = require('./env');
const db = require('./db');

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Cisco Spark profile is
//   serialized and deserialized.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done){
  done(null, obj);
});

// Use the SparkStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Spark
//   profile), and invoke a callback with a user object.
passport.use(new CiscoSparkStrategy({
    clientID: process.env.CISCOSPARK_CLIENT_ID,
    clientSecret: process.env.CISCOSPARK_CLIENT_SECRET,
    callbackURL: process.env.CISCOSPARK_REDIRECT_URI,
    scope: JSON.parse(process.env.CISCOSPARK_SCOPE)
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      db.User.findOne({
      	cisco_spark_id: profile.id
      }).exec(function(err, user) {
      	if(err) return done(err, profile._json);
      	if(user) {
          var userUpdateQuery = {
						cisco_spark_access_token: accessToken,
						cisco_spark_refresh_token: refreshToken
					};
          var integration = null;
          integration = user.cisco_spark_integrations.filter(function (integration) {
            return integration.cisco_spark_internal_integration_id === process.env.INTERNAL_CISCO_SPARK_INTEGRATION_ID;
          }).pop();
          if(!integration || integration == null) {
            userUpdateQuery['$push'] = {
              "cisco_spark_integrations": {
                cisco_spark_internal_integration_id: process.env.INTERNAL_CISCO_SPARK_INTEGRATION_ID
              }
            }
          }
      		db.User.findOneAndUpdate({
						cisco_spark_id: profile.id
					}, userUpdateQuery).exec(function(err, user) {
						if(err) return done(err, profile._json);
						return done(null, user);
					});
      	} else {
					var newUser = new db.User;
					var profileJson = JSON.parse(JSON.stringify(profile._json));
					newUser.cisco_spark_id = profileJson.id;
					newUser.cisco_spark_access_token = accessToken;
					newUser.cisco_spark_refresh_token = refreshToken;
					newUser.emails = profileJson.emails;
					newUser.avatar = profile.avatar;
					newUser.display_name = profileJson.displayName;
					newUser.nick_name = profileJson.nickName;
					newUser.first_name = profileJson.firstName;
					newUser.last_name = profileJson.lastName;
					newUser.org_id = profileJson.orgId;
					newUser.status = profileJson.status;
					newUser.type = profileJson.type;
					newUser.save(function(err, newUserSave) {
						if(err) return done(err, profile._json);
						return done(null, newUserSave);
					});
				}
      });
    });
  }
));

exports.passport = passport;
