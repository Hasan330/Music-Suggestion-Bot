//To do: connect to an api to suggest a song
const
    bodyParser = require('body-parser'),
    config = require('config'),
    crypto = require('crypto'),
    express = require('express'),
    https = require('https'),
    request = require('request');

var reply = require("./sendToUser");
var User = require('./User');
var genres = [
    "techno",
    "rock",
    "metal",
    "instrumental",
    "country",
    "chill",
    "jazz",
    "vocals"
]

var random = Math.floor(Math.random() * (genres.length - 0 + 1)) + 0;
console.log(random)


module.exports = {
    random: function(senderID) {
        suggestSong("", function(song) {
            console.log(song)
            reply.sendTextMessage(senderID, song)
            reply.sendTextMessage(senderID, "Please state how much you liked the song. Classifications are: Terrible, Bad, Ok, Good, Beautiful")
        })

    }
}




function suggestSong(songGenre, cb) {
    var apiKey = "7b630dcbf7a2524e694de92bf2b42aa8";
    var genre = songGenre || genres[random]; //Fallback
    global.suggestedGenre = genre;

    request({
        uri: 'http://api.musicgraph.com/api/v2/track/search?api_key=' + apiKey + '&genre=' + genre + '&limit=1',
        method: 'GET',
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            parsedBody = JSON.parse(body);
            youtubeID = parsedBody["data"][0].track_youtube_id;
            youtubeLink = getYoutubeURL(youtubeID, genre);
            console.log("Song example for genre:", genre, "is :", youtubeLink)

            //Update user data
            // User.save(userObj);
            cb(youtubeLink);
        } else {
            console.error(response.error);
            cb(null);
        }
    });
}

function getYoutubeURL(id, genre) {
    console.log(genre, "song id=", id)
    if (id)
        return "https://www.youtube.com/watch?v=" + id;
    else
        return "Sorry, no youtube link found for specified song"
}
