// This should recieve the user's message and try to understand what the user 
// wants through natural lanugage processing using natural brain library
const
    bodyParser = require('body-parser'),
    config = require('config'),
    crypto = require('crypto'),
    express = require('express'),
    https = require('https'),
    request = require('request');

var jsonfile = require('jsonfile')
var reply = require("./sendToUser");
var updateMusicTaste = require("./updater")
var staticReplies = require("./staticReplies")
var suggestSong = require("./songSuggester")
var BrainJSClassifier = require('natural-brain');
var classifier = new BrainJSClassifier();
var cleverMonkey = trainBot()

module.exports = {
    run: function(event) {
        var senderID = event.sender.id;
        var messageText = event.message.text;

        var messageCriteria = cleverMonkey.classify(messageText);
        console.log(messageCriteria);
        reply.sendTextMessage(senderID, "Message classification: " + messageCriteria);

        // if (global.suggestedGenre) {
        //     reply.sendTextMessage(senderID, "You thought that random " + suggestedGenre + " song was " + messageCriteria + " will update your taste accordingly");
        //     reply.sendTextMessage(senderID, "Type song new genre you would like me to suggest");
        // } else {
        //     console.log("No genre suggested yet");
        // }

        // switch (messageCriteria) {
        //     case "greetings":
        //         staticReplies.greetings(senderID)
        //         break;
        //     case "mood":

        //         break;
        //     case "suggest":
        //         suggestSong.random(senderID)
        //         break;
        //     case "dislike2":
        //     case "dislike1":
        //     case "nuetral":
        //         updateMusicTaste.run(senderID, messageCriteria, false)
        //         break;
        //     case "like1":
        //     case "like2":
        //         updateMusicTaste.run(senderID, messageCriteria, true)
        //         break;
        //     default:
        //         suggestSong.run(senderID, messageCriteria)
        // }
    }
}

function trainBot() {


    //Greetings
    classifier.addDocument("hello friend", "greetings")
    classifier.addDocument("hi there", "greetings")
    classifier.addDocument("marhaba haleebi", "greetings")
    classifier.addDocument("hey", "greetings")

    //Feedback
    classifier.addDocument("terrible", "dislike2")
    classifier.addDocument("bad", "dislike1")
    classifier.addDocument("nuetral", "nuetral")
    classifier.addDocument("good", "like1")
    classifier.addDocument("beautiful", "like2")

    //Bot Mood
    classifier.addDocument("How are you?", "mood")
    classifier.addDocument("How are u", "mood")
    classifier.addDocument("keefak", "mood")
    classifier.addDocument("whatsup", "mood")
    classifier.addDocument("how you doin", "mood")
    classifier.addDocument("whatsup", "mood")
    classifier.addDocument("are you fine", "mood")

    //Bot Name
    classifier.addDocument("what is your name", "name")
    classifier.addDocument("tell me your name", "name")

    //Genres    
    classifier.addDocument('hip-hop music', 'hip-hop');
    classifier.addDocument('rnb music', 'rnb');
    classifier.addDocument('country music', 'country');
    classifier.addDocument('rock music', 'rock');
    classifier.addDocument('metal music', 'metal');
    classifier.addDocument('instrumental music', 'instrumental');
    classifier.addDocument('jazz music', 'jazz');

    //Suggest a Song
    classifier.addDocument("suggest a song", "suggest")


    //Train the classifier (Natural Brain)
    classifier.train();

    console.log(classifier.classify("how are you"))

    // Return classifier
    return classifier;
}
