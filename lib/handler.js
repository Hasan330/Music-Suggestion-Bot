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
// var usersArray = [];

module.exports = {
    run: function(event) {
        var senderID = event.sender.id;
        var messageText = event.message.text;


        //Gets and saves the user name in the DB if the user is new
        User.get(senderID, function(user) {
            //If user is not already in the database, save the user and get his facebook details
            if (user) {
                console.log("User already in DB")
                // reply.sendTextMessage(senderID, "User already in database")
                classify.run(event);
            } else {
                reply.sendTextMessage(senderID, "New user, saving to DB")
                console.log("User is a new user, not found in DB")
                updateUserData(senderID, messageText, function(userObj) {
                    console.log("\nUser Object after callback is", userObj)
                    reply.sendTextMessage(senderID, "Welcome new user, saving your data to database");
                });
                //         //Classifying received message
                        classify.run(event);
            }
        })

    },
};

function updateUserData(senderID, msg, cb) {
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

            //Create user object
            userObj = {
                name: firstName + " " + lastName,
                id: senderID,
                userGender: gender,
                lastMessage: msg,
                musicTaste: {

                },
            }
            console.log("User object:", userObj)

            //Update user data
            User.save(userObj);
            cb(userObj);
        } else {
            console.error(response.error);
            cb(null);
        }
    });
}
