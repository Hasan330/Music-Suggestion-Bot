var reply = require("./sendToUser");

module.exports = {
    run: function(senderID, messageCriteria, bool) {
        if (bool == true) {
            if (global.suggestedGenre) {
                reply.sendTextMessage(senderID, "You thought that random " + suggestedGenre + " song was " + messageCriteria + " will try to suggest more songs like this");
                reply.sendTextMessage(senderID, "Type song new genre you would like me to suggest");
                global.suggestedGenre = null;
            } else {
                reply.sendTextMessage(senderID, "Sorry, no song was suggested for feedback !");
                console.log("No genre suggested yet");
            }

        } else {
            if (global.suggestedGenre) {
                reply.sendTextMessage(senderID, "You thought that random " + suggestedGenre + " song was " + messageCriteria + " will avoid sending you similar songs in the future");
                reply.sendTextMessage(senderID, "Type song new genre you would like me to suggest");
                global.suggestedGenre = null;
            } else {
                reply.sendTextMessage(senderID, "Sorry, no song was suggested for feedback !");
                console.log("No genre suggested yet");
            }
        }

    }
}
