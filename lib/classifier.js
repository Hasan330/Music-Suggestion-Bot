// This should recieve the user's message and try to understand what the user 
// wants through natural lanugage processing using natural brain library
var jsonfile = require('jsonfile')


var reply = require("./sendToUser");
var updateMusicTaste = require("./updater")
var reekMonkey = train()

module.exports = {
    run: function(event, user) {        
        var senderID = event.sender.id;
        var recipientID = event.recipient.id;
        var timeOfMessage = event.timestamp;
        var message = event.message;
        var messageText = message.text;
        var messageAttachments = message.attachments;

        var messageCriteria = reekMonkey.classify(messageText);

        console.log(messageCriteria);
        reply.sendTextMessage(senderID, "Your message was classified as :" + messageCriteria);

        updateMusicTaste.run(messageCriteria, user)
    }
}

function train() {
    var BrainJSClassifier = require('natural-brain');
    var classifier = new BrainJSClassifier();


    classifier.addDocument('hip-hop music', 'hip-hop');
    classifier.addDocument('rnb music', 'rnb');
    classifier.addDocument('country music', 'country');
    classifier.addDocument('rock music', 'rock');
    classifier.addDocument('metal music', 'metal');
    classifier.addDocument('instrumental music', 'instrumental');
    classifier.addDocument('jazz music', 'jazz');

    classifier.addDocument("this song sucks", "dislike")
    classifier.addDocument("this is ugly it is the ugliest", "dislike")
    classifier.addDocument("i don't like it", "dislike")
    classifier.addDocument("this is some bad music", "dislike")
    classifier.addDocument("saying ewww means you don't like it", "dislike")
    classifier.addDocument("now that is terrible", "dislike")
    classifier.addDocument("this is the worst worse", "dislike")
    classifier.addDocument("it is so noisy", "dislike")
    classifier.addDocument("i dislike it", "dislike")

    classifier.addDocument("that is beautiful", "like")
    classifier.addDocument("wow this is lovely", "like")
    classifier.addDocument("so cute", "like")
    classifier.addDocument("that is good", "like")
    classifier.addDocument("it is calm calming", "like")
    classifier.addDocument("that sounds great", "like")
    classifier.addDocument("that good i like it", "like")
    classifier.addDocument("nice taste", "like")

    classifier.addDocument("hello friend", "greetings")
    classifier.addDocument("hi there", "greetings")
    classifier.addDocument("marhaba haleebi", "greetings")
    classifier.addDocument("hey you", "greetings")
    classifier.addDocument("howdy cowboy", "greetings")

    classifier.addDocument("How are you?", "mood")
    classifier.addDocument("you are how people see you", "mood")
    classifier.addDocument("how i view u is not important", "mood")
    classifier.addDocument("I am good", "mood")
    classifier.addDocument("How are u", "mood")
    classifier.addDocument("keefak", "mood")
    classifier.addDocument("whatsup", "mood")
    classifier.addDocument("how you doin", "mood")
    classifier.addDocument("whatsup", "mood")
    classifier.addDocument("how are you", "mood")
    classifier.addDocument("it is going fine", "mood")

    classifier.addDocument("my name is Reek", "name")
    classifier.addDocument("I am Reek", "name")
    classifier.addDocument("your name defines who you are", "name")
    classifier.addDocument("tell me now who are you", "name")

    classifier.train();

    console.log(classifier.classify("who are you"));

    return classifier;
}
