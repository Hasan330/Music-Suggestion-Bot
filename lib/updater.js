var reply = require("./sendToUser");

module.exports = {
    run: function(senderID, messageCriteria, bool) {
        if (bool) {
        	//If there was a suggested song to give feedback to (handling case where user states whether or not they like a song before suggesting a song or stating it twice)
            if (global.suggestedGenre) {
                reply.sendTextMessage(senderID, "You thought that random " + suggestedGenre + " song was " + messageCriteria + " will try to suggest more songs like this");
                reply.sendTextMessage(senderID, "Type song genre you would like me to suggest Ex: Jazz or type suggest song for another random song");
                global.suggestedGenre = null;
            } else {
                reply.sendTextMessage(senderID, "Sorry, no song was suggested for feedback !");
                console.log("No genre suggested yet");
            }

        } else {
        	//If there was a suggested song to give feedback to (handling case where user states whether or not they like a song before suggesting a song or stating it twice)
            if (global.suggestedGenre) {
                reply.sendTextMessage(senderID, "You thought that random " + suggestedGenre + " song was " + messageCriteria + " will avoid sending you similar songs in the future");
                reply.sendTextMessage(senderID, "Type song genre you would like me to suggest Ex: Jazz or type suggest song for another random song");
                global.suggestedGenre = null;
            } else {
                reply.sendTextMessage(senderID, "Sorry, no song was suggested for feedback !");
                console.log("No genre suggested yet");
            }
        }
    }
}
