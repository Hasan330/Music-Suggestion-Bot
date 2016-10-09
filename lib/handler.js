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

        updateUserData(senderID, messageText)

        //Save the user in mongoDB
        // User.save(userObj);

        //Just testing that we got here
        reply.sendTextMessage(senderID, "Processing request")

        //Fetching user from database
        // var getUser = User.get(userObj, function(data) {
        //     console.log("Callback called", data)
        //     reply.sendTextMessage(senderID, data);  //might trigger error
        // });
        // console.log("User Found:", getUser);

        //Classifying received message
        classify.run(event, userObj)

    },
};






function updateUserData(senderID, msg) {
    request({
        uri: 'https://graph.facebook.com/v2.6/' + senderID + '?fields=first_name,last_name,locale,timezone,gender&access_token=EAAQA8eJNThwBALBn6mIbdjFmElIRe3IllqEVoIF89UdksnumZCbfOmouKc08VZBGptBEbOc66PRZCOujLa4OF9RAkZCYWUZCtLUBlMFRDffRT2pYZBlA4p7udgVnH9N9GqpZCBPhpEZAH3NZC17I26MPJ91B9WSnZBbg0e3wqf07jaigZDZD',
        // 1167216919995113
        // EAAQA8eJNThwBALBn6mIbdjFmElIRe3IllqEVoIF89UdksnumZCbfOmouKc08VZBGptBEbOc66PRZCOujLa4OF9RAkZCYWUZCtLUBlMFRDffRT2pYZBlA4p7udgVnH9N9GqpZCBPhpEZAH3NZC17I26MPJ91B9WSnZBbg0e3wqf07jaigZDZD
        method: 'GET',
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            parsedBody = JSON.parse(body);
            firstName = parsedBody["first_name"];
            lastName = parsedBody["last_name"];
            locale = parsedBody["locale"];
            gender = parsedBody["gender"];

            userObj = {
                id: senderID,
                name: firstName + " " + lastName,
                lastMessage: msg,
                userGender: gender,
                musicTaste: {
                    rock: 2,
                    jazz: 4,
                    hiphop: 5,
                },
            }
            console.log("User object:", userObj)
            User.save(userObj);

            return userObj;
        } else {
            console.error(response.error);
        }
    });
}
