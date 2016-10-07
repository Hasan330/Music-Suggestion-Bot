const
    bodyParser = require('body-parser'),
    config = require('config'),
    crypto = require('crypto'),
    express = require('express'),
    https = require('https'),
    request = require('request');

var User = require('./User');
var reply = require("./sendToUser");
var classify = require("./classifier");


module.exports = {
    run: function(event) {
        var senderID = event.sender.id;
        var recipientID = event.recipient.id;
        var timeOfMessage = event.timestamp;
        var message = event.message;
        var messageText = message.text;

        // reply.sendTextMessage(senderID, getUserData(senderID))

        // Creating the user object
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

        //Save the user in mongoDB
        User.save(userObj);

        //Just testing that we got here
        reply.sendTextMessage(senderID, "Processing request")

        //Fetching user from database
        var getUser = User.get(userObj, function(data) {
            console.log("Callback called", data)
            reply.sendTextMessage(senderID, data);
        });
        console.log("User Found:", getUser);

        //Classifying received message
        classify.run(event, userObj)

    },
};


function getUserData(senderID) {
    request({
        uri: 'https://graph.facebook.com/v2.6/' + senderID + '?fields=first_name,last_name,locale,timezone,gender&access_token=EAAQA8eJNThwBALBn6mIbdjFmElIRe3IllqEVoIF89UdksnumZCbfOmouKc08VZBGptBEbOc66PRZCOujLa4OF9RAkZCYWUZCtLUBlMFRDffRT2pYZBlA4p7udgVnH9N9GqpZCBPhpEZAH3NZC17I26MPJ91B9WSnZBbg0e3wqf07jaigZDZD',
        // 1167216919995113
        // EAAQA8eJNThwBALBn6mIbdjFmElIRe3IllqEVoIF89UdksnumZCbfOmouKc08VZBGptBEbOc66PRZCOujLa4OF9RAkZCYWUZCtLUBlMFRDffRT2pYZBlA4p7udgVnH9N9GqpZCBPhpEZAH3NZC17I26MPJ91B9WSnZBbg0e3wqf07jaigZDZD
        method: 'GET',
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var firstName = body.first_name;
            var lastName = body.last_name;
            var locale = body.locale;
            var gender = body.gender;
            console.log("Response for user details =", body)
        } else {
            console.error(response.error);
        }
    });
    return firstName;
}
