// // handler = require('./handler');
// var User = require('./User');
// var reply = require("./sendToUser");

//     musicTaste: {
//     	jazz: 3
//     }

// senderID= 1167216919995113;

// var genre = "jazz";
// var level = 2;
// User.get(1167216919995113, function(user){
// 	// console.log(user)
// 	var updated = user;
// 	updated.musicTaste[genre] = level;
// 	console.log("\n", updated, "\n")
// 	User.save(updated)

// })

//  User.get(senderID, function(user) {
//  			console.log("inside get: ",user)
//             //If user is not already in the database, save the user and get his facebook details
//             if (user) {
//                 console.log("User in DB")
//                 reply.sendTextMessage(senderID, "User already in database")
//             } else {
//                 console.log("User is a new user, not found in DB")
//                 reply.sendTextMessage(senderID, "New user, saving to DB")

//             }
//         })

// User.get(shab.id, function(res) {
//     console.log("In the callback", res);
//     name = res["name"];
//     console.log("\nUser Found, name=", name);
// })

// console.log("\n")
// shab = updateUserMusicTaste(shab, "jazz", 5)

// User.save(shab)
//     // User.get(shab)



var song = require("./songSuggester")

song.run(5, "jazz")