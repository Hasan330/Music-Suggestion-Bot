// This should recieve the user's message and try to understand what the user 
// wants through natural lanugage processing using natural brain library
var jsonfile = require('jsonfile')
var reply = require("./sendToUser");
var updateMusicTaste = require("./updater")
var staticReplies = require("./replier")
var suggestSong = require("./songSuggester")
var reekMonkey = train()

module.exports = {
    run: function(event, userObj) {
        var senderID = event.sender.id;
        var message = event.message;
        var messageText = message.text;

        var messageCriteria = reekMonkey.classify(messageText);

        console.log(messageCriteria);
        reply.sendTextMessage(senderID, "Message classification: " + messageCriteria);

        switch (messageCriteria) {
            case "greetings":
                staticReplies.greetings(senderID, userObj)
                break;
            case "mood":

                break;
            case "suggest":
                suggestSong.random(senderID, userObj)
                break;
            case "dislike2":
                updateMusicTaste.run(userObj, messageCriteria, false)
                break;
            case "dislike":
                updateMusicTaste.run(userObj, messageCriteria, false)
                break;
            case "nuetral":
                updateMusicTaste.run(userObj, messageCriteria, false)
                break;
            case "like1":
                updateMusicTaste.run(userObj, messageCriteria, true)
                break;
            case "like2":
                updateMusicTaste.run(userObj, messageCriteria, true)
                break;
            default:
                suggestSong.run(messageCriteria, userObj)
        }
    }
}


function train() {
    var BrainJSClassifier = require('natural-brain');
    var classifier = new BrainJSClassifier();

    //Greetings
    classifier.addDocument("hello friend", "greetings")
    classifier.addDocument("hi there", "greetings")
    classifier.addDocument("marhaba haleebi", "greetings")
    classifier.addDocument("hey you", "greetings")
    classifier.addDocument("howdy cowboy", "greetings")
    classifier.addDocument("heyy ", "greetings")

    //Bot Mood
    classifier.addDocument("How are you?", "mood")
    classifier.addDocument("How are you Reek", "mood")
    classifier.addDocument("you are how people see you", "mood")
    classifier.addDocument("how i view u is not important", "mood")
    classifier.addDocument("I am good good fine good fine good fine good", "mood")
    classifier.addDocument("How are u", "mood")
    classifier.addDocument("keefak", "mood")
    classifier.addDocument("whatsup", "mood")
    classifier.addDocument("how you doin", "mood")
    classifier.addDocument("whatsup", "mood")
    classifier.addDocument("how are you", "mood")
    classifier.addDocument("it is going fine", "mood")
    classifier.addDocument("are you fine", "mood")


    //Bot Name
    // classifier.addDocument("your name defines who you are", "name")
    // classifier.addDocument("tell me now who are you", "name")
    // classifier.addDocument("What is your name", "name")
    // classifier.addDocument("your name tell me what is your name", "name")

    //User Name
    classifier.addDocument("My name is", "userName")
    classifier.addDocument("I am sawsan", "userName")

    //Genres    
    classifier.addDocument('hip-hop music', 'hip-hop');
    classifier.addDocument('rnb music', 'rnb');
    classifier.addDocument('country music', 'country');
    classifier.addDocument('rock music', 'rock');
    classifier.addDocument('metal music', 'metal');
    classifier.addDocument('instrumental music', 'instrumental');
    classifier.addDocument('jazz music', 'jazz');

    //Feedback
    classifier.addDocument("terrible", "dislike2")
    classifier.addDocument("bad", "dislike1")
    classifier.addDocument("nuetral", "nuetral")
    classifier.addDocument("good", "like1")
    classifier.addDocument("amazing", "like1")

    classifier.addDocument("suggest a song", "suggest")

    //Dislike Criteria
    // classifier.addDocument("sucks", "dislike")
    // classifier.addDocument("this is ugly it is the ugliest", "dislike")
    // classifier.addDocument("i don't don't don't don't do not do not it", "dislike")
    // classifier.addDocument("this is some bad music", "dislike")
    // classifier.addDocument("saying eww or ew or ewww means you don't", "dislike")
    // classifier.addDocument("now that is terrible", "dislike")
    // classifier.addDocument("this is the worst worse", "dislike")
    // classifier.addDocument("it is so noisy", "dislike")

    //Like Criteria
    // classifier.addDocument("like", "like")
    // classifier.addDocument("love", "love")
    // classifier.addDocument("nuetral", "nuetral")
    // classifier.addDocument("it is calm calming", "like")
    // classifier.addDocument("that sounds great", "like")
    // classifier.addDocument("that good i like like like it", "like")
    // classifier.addDocument("i like it", "like")
    // classifier.addDocument("nice taste", "like")


    //Train the classifier (Natural Brain)
    classifier.train();

    // Test some text
    console.log(classifier.classify("hello !"));
    console.log(classifier.classify("heyy"));
    console.log(classifier.classify("how are you?"));
    console.log(classifier.classify("how is it going?"));
    console.log(classifier.classify("like"));
    console.log(classifier.classify("bad"));
    console.log(classifier.classify("whats your name?"));
    console.log(classifier.classify("suggest a song"));
    console.log(classifier.classify("how are you"));

    // Return classifier
    return classifier;
}
