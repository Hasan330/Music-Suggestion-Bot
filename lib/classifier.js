//This should recieve the user's message and try to understand what the user 
// wants through natural lanugage processing using natural brain library

var reply = require("./sendToUser");
var BrainJSClassifier = require('natural-brain');
var classifier = new BrainJSClassifier();

classifier.addDocument('hip-hop', 'hip-hop');
classifier.addDocument('rnb', 'rnb');
classifier.addDocument('country', 'country');
classifier.addDocument('rock', 'rock');
classifier.addDocument('metal', 'metal');
classifier.addDocument('instrumental', 'instrumental');
classifier.addDocument('jazz', 'jazz');

classifier.addDocument("sucks", "dislike")
classifier.addDocument("ugly ugliest", "dislike")
classifier.addDocument("don't like", "dislike")
classifier.addDocument("bad music", "dislike")
classifier.addDocument("what the hell ewww", "dislike")
classifier.addDocument("terrible", "dislike")
classifier.addDocument("worst worse", "dislike")
classifier.addDocument("noisy", "dislike")
classifier.addDocument("dislike", "dislike")

classifier.addDocument("beautiful", "like")
classifier.addDocument("lovely", "like")
classifier.addDocument("cute", "like")
classifier.addDocument("good", "like")
classifier.addDocument("calm calming", "like")
classifier.addDocument("great", "like")
classifier.addDocument("good", "like")
classifier.addDocument("nice", "like")
classifier.addDocument("like", "like")

classifier.addDocument("hello", "greetings")
classifier.addDocument("hi", "greetings")
classifier.addDocument("marhaba", "greetings")
classifier.addDocument("hey", "greetings")
classifier.addDocument("howdy", "greetings")


classifier.addDocument("How are you?", "mood")


classifier.train();

// console.log(classifier.classify('i like hip-hop music!')); // -> hip-hop
// console.log(classifier.classify('this song is bad')); // -> dislike
// console.log(classifier.classify('What a lovely song')); // -> like
// console.log(classifier.classify('ewww !')); // -> dislike


module.exports = {
    run: function(event) {
        var senderID = event.sender.id;
        var recipientID = event.recipient.id;
        var timeOfMessage = event.timestamp;
        var message = event.message;
        var messageText = message.text;
        var messageAttachments = message.attachments;
        console.log(classifier.classify(messageText));
        reply.sendTextMessage(senderID, "Your message was classified as :"+classifier.classify(messageText));

    }
}
