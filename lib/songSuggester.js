var reply = require("./sendToUser");
var User = require('./User');


module.exports={
	random: function(senderID){
		reply.sendTextMessage(senderID, "Suggesting song..")
		reply.sendTextMessage(senderID, "https://www.youtube.com/watch?v=bltr_Dsk5EY")
		reply.sendTextMessage(senderID, "Please state how much you liked the song. Classifications are: Terrible, Bad, Neutral, Good, Amazing")
		global.suggestedGenre = "jazz";
	}
}