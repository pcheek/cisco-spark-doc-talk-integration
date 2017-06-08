const mongoose = require('mongoose');

const userIntegrationSchema = new mongoose.Schema({
	cisco_spark_internal_integration_id: { type: String, required: true, default: null },
	cisco_spark_room_id: { type: String, required: false, default: null },
	cisco_spark_public_key: { type: String, required: false, default: null },
	cisco_spark_private_key: { type: String, required: false, default: null }
}, {
  // Historical timestamps for the integration.
  timestamps: {
    createdAt: 'created',
    updatedAt: 'updated'
  }
});

const userSchema = new mongoose.Schema({
	cisco_spark_id: { type: String, required: true },
	cisco_spark_access_token: { type: String, required: false, default: null },
	cisco_spark_refresh_token: { type: String, required: false, default: null },
  cisco_spark_integrations: [userIntegrationSchema],
	avatar: { type: String, required: false, default: null },
	emails: [{ type: String, required: false, default: null }],
	display_name: { type: String, required: false, default: null },
	nick_name: { type: String, required: false, default: null },
	first_name: { type: String, required: false, default: null },
	last_name: { type: String, required: false, default: null },
	org_id: { type: String, required: false, default: null },
	status: { type: String, required: false, default: null },
	type: { type: String, required: false, default: null }
}, {
  // Historical timestamps for the user's account.
  timestamps: {
    createdAt: 'created',
    updatedAt: 'updated'
  }
});

userSchema.methods.getRooms = function getRooms (callback) {
  process.env.CISCOSPARK_ACCESS_TOKEN = this.cisco_spark_access_token;
	const ciscospark = require('ciscospark/env');
	var thisIntegration = null;
	var integrations = this.cisco_spark_integrations.filter(function(integration) {
		if(cisco_spark_integration.cisco_spark_internal_integration_id == process.env.INTERNAL_CISCO_SPARK_INTEGRATION_ID) {
			thisIntegration = integration;
		}
	})[0];
  var defaultRoomId = null;
	if(thisIntegration && thisIntegration != null) {
		defaultRoomId = thisIntegration.cisco_spark_room_id;
	}
	ciscospark.rooms.list({
		max: 100
	})
  .then(function(rooms) {
    var defaultRoomObj = null;
  	var roomObjs = [];
    var room = rooms.items.filter(function(room) {
      if(room.id == defaultRoomId) {
        room.default = true;
        defaultRoomObj = room;
      } else {
  	   roomObjs.push(room);
     }
      return true;
    })[0];
    return callback(null, roomObjs, defaultRoomObj);
  })
  .catch(function(reason) {
    console.error("Error fetching user's rooms from Cisco Spark API.", reason);
    return callback(reason);
  });
};

exports.User = mongoose.model('User', userSchema);
//exports.UserIntegration = mongoose.model('UserIntegration', userIntegrationSchema);
