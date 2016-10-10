var reply = require("./sendToUser");
var User = require('./User');


module.exports={
	random: function(senderID, userObj){
		reply.sendTextMessage(senderID, "Suggesting song..")
	}
}