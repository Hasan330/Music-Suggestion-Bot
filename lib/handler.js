const
    bodyParser = require('body-parser'),
    config = require('config'),
    crypto = require('crypto'),
    express = require('express'),
    https = require('https'),
    User = require('./User'),
    request = require('request');


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
            name: "janedqwdm",
            lastMessage: messageText,
            musicTaste: {
              rock: 2,
              jazz: 4,
            },
        }

        User.save(userObj);

        sendTextMessage(senderID, "Processing request")

        // var getUser = User.get(userObj, function(data){
        //   console.log("Callback called")
        // });
        // console.log("User Found:", getUser)
        // sendTextMessage(senderID, getUser);

    },
};


function sendTextMessage(recipientId, messageText) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            text: messageText,
            metadata: "DEVELOPER_DEFINED_METADATA"
        }
    };
    callSendAPI(messageData);
}


function callSendAPI(messageData) {
    request({
        uri: 'https://graph.facebook.com/v2.6/me/messages',

        qs: { access_token: "EAAQA8eJNThwBALBn6mIbdjFmElIRe3IllqEVoIF89UdksnumZCbfOmouKc08VZBGptBEbOc66PRZCOujLa4OF9RAkZCYWUZCtLUBlMFRDffRT2pYZBlA4p7udgVnH9N9GqpZCBPhpEZAH3NZC17I26MPJ91B9WSnZBbg0e3wqf07jaigZDZD" },

        method: 'POST',
        json: messageData

    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var recipientId = body.recipient_id;
            var messageId = body.message_id;

            if (messageId) {
                console.log("Successfully sent message with id %s to recipient %s",
                    messageId, recipientId);
            } else {
                console.log("Successfully called Send API for recipient %s",
                    recipientId);
            }
        } else {
            console.error(response.error);
        }
    });
}
