// // handler = require('./handler');
// var User = require('./User');
// var reply = require("./sendToUser");

// var shab = {
//     id: 567,
//     name: 'shab2',
//     musicTaste: {},
// }

// senderID= 1167216919995113;

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

// User.save(shab)
// User.get(shab.id, function(res) {
//     console.log("In the callback", res);
//     name = res["name"];
//     console.log("\nUser Found, name=", name);
// })

// console.log("\n")
// shab = updateUserMusicTaste(shab, "jazz", 5)

// User.save(shab)
//     // User.get(shab)



// 		var getUser = User.get(shab, function(data) {
//     			console.log("\nCallback called")
// 		});




// 		name = getUser["name"];
// 		console.log("\nUser Found, name=", name);

// function updateUserMusicTaste(shab, genre, likeLevel) {
//     shab.musicTaste[genre] = likeLevel;
//     // console.log("in function ",shab)
//     return shab;
// }



//Important stuff !!
//Fetching user from database
// User.get(shab.id, function(res) {
//     console.log("In the callback", res);
//     name = res["name"];
//     console.log("\nUser Found, name=", name);
// })




// // console.log(global.user)

// // var getUser = User.get(shab, function(data) {
// //                 console.log("\nCallback called")
// //             });

// //             ****
// //             Getting the user name and sending it back to him/her
// //             ****
// //             name = getUser;
// //             console.log("\nUser Found, name=", name);
// //             // reply.sendTextMessage(senderID, "Hello " + name);

// // handler.run(shab);
// // 
// // 

// // const request = require('request');

// // id = 1167216919995113;
// // console.log(getUserData(id));


// // var hand = require("./handler");
// // var event = {
// // 	sender : {id: 1167216919995113},
// // 	message: {text: "Testing testing testing"}
// // }

// // hand.run(event);
// //


var song = require("./songSuggester")

song.random(5)