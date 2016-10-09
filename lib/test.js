// handler = require('./handler');

// var shab = {
// 	sender : {id: 1234},
// 	name: 'shab',

// }

// handler.run(shab);
// 
// 

// const request = require('request');

// id = 1167216919995113;
// console.log(getUserData(id));


// function getUserData(senderID) {
//     var firstName
//     request({
//         uri: 'https://graph.facebook.com/v2.6/' + senderID + '?fields=first_name,last_name,locale,timezone,gender&access_token=EAAQA8eJNThwBALBn6mIbdjFmElIRe3IllqEVoIF89UdksnumZCbfOmouKc08VZBGptBEbOc66PRZCOujLa4OF9RAkZCYWUZCtLUBlMFRDffRT2pYZBlA4p7udgVnH9N9GqpZCBPhpEZAH3NZC17I26MPJ91B9WSnZBbg0e3wqf07jaigZDZD',
//         // 1167216919995113
//         // EAAQA8eJNThwBALBn6mIbdjFmElIRe3IllqEVoIF89UdksnumZCbfOmouKc08VZBGptBEbOc66PRZCOujLa4OF9RAkZCYWUZCtLUBlMFRDffRT2pYZBlA4p7udgVnH9N9GqpZCBPhpEZAH3NZC17I26MPJ91B9WSnZBbg0e3wqf07jaigZDZD
//         method: 'GET',
//     }, function(error, response, body) {
//         if (!error && response.statusCode == 200) {
//             firstName = body.first_name;
//             var lastName = body.last_name;
//             var locale = body.locale;
//             var gender = body.gender;
//             console.log("Response for user details =", body);
//         } else {
//             console.error(response.error);
//         }
//     });
//     return firstName;
// }


