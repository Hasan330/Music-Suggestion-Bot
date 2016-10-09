// Mongo DB

var mongoose = require('mongoose');
mongoose.connect('mongodb://admin:root@ds021356.mlab.com:21356/self-learning');


module.exports = {
    //Save function takes user object
    save: function(user) {
        User.update({ id: user.id }, 
        	user,
        	{ upsert: true },
            function(err) {
            	if(err){
            		console.log(err)
            	}
            });
    },

    //Getter function returns user object
    get: function(userId, cb) {
    	console.log("Searching for user", userId)
        User.findOne({"id": userId}, function(user) {
            cb(user);
        });
        return user;
    }
};


// The schema
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var userSchema = new Schema({
    author: ObjectId,
    name: String,
    id: String,
    userGender: String,
    lastMessage: String,
    musicTaste: {
        overall: String,
        jazz: Number,
        rock: Number,
        metal: Number,
        hiphop: Number,
        RnB: Number,
        country: Number,
        folk: Number,
        instrumental: Number,
        triphop: Number,
    },
    isCreated: 0,
    date: Date
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
});

var User = mongoose.model('User', userSchema); //The schema to be created on mongoDB

