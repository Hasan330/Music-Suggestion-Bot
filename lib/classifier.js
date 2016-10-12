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
var staticReplier = require("./staticReplies")
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



        switch (messageCriteria) {
            case "greetings":
                staticReplier.greetings(senderID)
                break;
                //     case "mood":

                //         break;
            case "suggest":
                suggestSong.random(senderID)
                break;
            case "terrible":
            case "bad":
                updateMusicTaste.run(senderID, messageCriteria, false)
                break;
            case "nuetral":
            case "good":
            case "beautiful":
                updateMusicTaste.run(senderID, messageCriteria, true)
                break;
            default:
                reply.sendTextMessage(senderID, "default switch case");
                //suggestSong.run(senderID, messageCriteria)
        }
    }
}

function trainBot() {


    //Greetings
    classifier.addDocument("hello friend", "greetings")
    classifier.addDocument("hi there", "greetings")
    classifier.addDocument("marhaba haleebi", "greetings")
    classifier.addDocument("hey", "greetings")

    //Feedback
    classifier.addDocument("terrible", "terrible")
    classifier.addDocument("terrible ugly disgusting", "terrible")
    classifier.addDocument("bad", "bad")
    classifier.addDocument("bad not ", "bad")
    classifier.addDocument("ok", "nuetral")
    classifier.addDocument("nuetral thing", "nuetral")
    classifier.addDocument("good", "good")
    classifier.addDocument("good nice", "good")
    classifier.addDocument("beautiful", "beautiful")
    classifier.addDocument("awesome beautiful perfect lovely", "beautiful")
    classifier.addDocument("perfect", "beautiful")

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

    console.log(classifier.classify("Beautiful"))

    // Return classifier
    return classifier;
}
