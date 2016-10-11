const
    express = require('express'),
    https = require('https'),
    request = require('request');

var User = require('./User');
var reply = require("./sendToUser");
var classify = require("./classifier");

module.exports = {
    run: function(event) {
        var senderID = event.sender.id;
        var messageText = event.message.text;

        //Just testing that we got here
        // reply.sendTextMessage(senderID, "Processing request")


        //Gets and saves the user name in the DB
        updateUserData(senderID, messageText, function(userObj) {
            console.log("\nUser Object after callback is", userObj)
            
            //Fetching user from database
            var getUser = User.get(userObj, function(data) {
                console.log("\nCallback called")
            });
            
            /*****
            Getting the user name and sending it back to him/her
            *****/
            // name = getUser["name"];
            // console.log("\nUser Found, name=", name);
            // reply.sendTextMessage(senderID, "Hello " + name);


            //Classifying received message
            classify.run(event, userObj)
        });
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
                    rock: 2,
                    jazz: 4,
                    hiphop: 5,
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
