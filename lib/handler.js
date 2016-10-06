const
    bodyParser = require('body-parser'),
    config = require('config'),
    crypto = require('crypto'),
    express = require('express'),
    https = require('https'),
    User = require('./User'),
    request = require('request');

var reply = require("./sendToUser");
var classify = require("./classifier")


module.exports = {
    run: function(event) {
        var senderID = event.sender.id;
        var recipientID = event.recipient.id;
        var timeOfMessage = event.timestamp;
        var message = event.message;
        var messageText = message.text;
        var messageAttachments = message.attachments;

        var userObj = {
            id: senderID,
            name: "hasansansan",
            lastMessage: messageText,
            musicTaste: {
                rock: 2,
                jazz: 4,
                hiphop: 5,
            },
        }

        //Save the user in the mongoDB
        User.save(userObj);

        reply.sendTextMessage(senderID, "Processing request")

        var getUser = User.get(userObj, function(data) {
            console.log("Callback called", data)
            reply.sendTextMessage(senderID, data);
        });
        console.log("User Found:", getUser);

        //Classifying received message
        classify.run(event)

    },
};