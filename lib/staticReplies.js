var reply = require("./sendToUser");
var User = require('./User');


module.exports = {
    greetings: function(senderID) {

        User.get(senderID, function(user) {
            if (user) {
                name = user["name"] || "Hasan" ;
                // name = "Hasan";
            } else
                name = "New User";

            var replyPool = ["Hello " + name + "! Glad to make your acquaintance. I am Reek a clever song suggester, you can try me by saying suggest song",
                "Heya ! Allow me to cheat your name " + name + " I am Reek, your friendly song suggester, you can try me by saying suggest song",
                "Howdy my dear " + name + ". Allow me to introduce myself, my name is Reek and I am designed to suggest songs based on user preferences, try me by saying suggest song",
                "Oh I remember you " + name + ", in case you don't know who I am, my name is Reek and I can suggest songs tailored to your needs. Say suggest songs to see what i can do"
            ];

            var random = Math.floor(Math.random() * (replyPool.length - 0 + 1)) + 0;
            console.log(random);
            reply.sendTextMessage(senderID, replyPool[random])
        })
    }
}
