//To do: connect to an api to suggest a song
const
    https = require('https'),
    request = require('request');

var reply = require("./sendToUser"),
    User = require('./User');

module.exports = {
    run: function(senderID, genre) {
        suggestSong(genre, senderID, function(song) {
            console.log(song)
            reply.sendTextMessage(senderID, song)
            reply.sendTextMessage(senderID, "Please state how much you liked the song. Classifications are: Terrible, Bad, Ok, Good, Beautiful")
        })
    }
}

function suggestSong(songGenre, senderID, cb) {
    var apiKey = "7b630dcbf7a2524e694de92bf2b42aa8";
    var genre = songGenre || genres[random]; //Fallback
    // reply.sendTextMessage(senderID, "Suggesting random " + genre + " song")
    global.suggestedGenre = genre;
    limit = 50;
    url = 'http://api.musicgraph.com/api/v2/track/search?api_key=' + apiKey + '&genre=' + genre + '&limit=' + limit
    console.log(url)
    request({
        uri: url,
        method: 'GET',
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            parsedBody = JSON.parse(body);
            // console.log(parsedBody)
            randomSong = Math.floor(Math.random() * (limit));
            console.log("Searching for random "+ genre+ " song number " + randomSong)
            if (parsedBody["data"][randomSong].track_youtube_id) {
                console.log("found random song " + parsedBody["data"][randomSong])
                youtubeID = parsedBody["data"][randomSong].track_youtube_id;
            } else {
                console.log("Random song not found")
                flag = false;
                for (i = 0; i < limit && !flag; i++) {
                    if (parsedBody["data"][i].track_youtube_id && !flag) {
                        console.log("found random song in for loop at index: " + i + "with details: " + parsedBody["data"][i])
                        youtubeID = parsedBody["data"][i].track_youtube_id;
                        flag = true;
                    } else {
                        console.log("Song number", i, "doesn't have youtube track id")
                    }
                }
            }
            youtubeLink = getYoutubeURL(youtubeID, genre);
            console.log("Song example for genre:", genre, "is :", youtubeLink)

            cb(youtubeLink);
        } else {
            console.error("Error sending request to api:", response.statusCode);
            cb("error sending request to api");
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


var genres = [
    "techno",
    "rock",
    "metal",
    "instrumental",
    "country",
    "chill",
    "jazz",
    "vocals",
    "folk",
    "world",
    "tropical"
]
random = Math.floor(Math.random() * (genres.length));
console.log(random)
