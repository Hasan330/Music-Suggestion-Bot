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


var hand = require("./handler");
var event = {
	sender : {id: 1167216919995113},
	message: {text: "Testing testing testing"}
}

hand.run(event);