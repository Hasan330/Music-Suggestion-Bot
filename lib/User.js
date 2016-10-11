// Mongo DB

var mongoose = require('mongoose');
mongoose.connect('mongodb://admin:root@ds021356.mlab.com:21356/self-learning');


module.exports = {
    //Save function takes user object
    save: function(user) {
        console.log("Saving user:", user)
        User.update({ id: user.id },
            user, 
            { upsert: true },
            function(err) {
                if (err) {
                    console.log(err)
                }
            });
    },

    //Getter function returns user object
    get: function(user, cb) {
        console.log("\nSearching for user", user.id)
        
        User.findOne({ id: user.id }, function(err, res) {
            if(!err && res ){
                console.log("\nFound user:", res)
                cb(res);
            }
            else
                console.log("Error searching for user, please provide correct id")
        });
        return user;
    },

    findAll: function() {
        User.find(function(err, res){
            console.log("Users", res)

        });
    },
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
    lastSuggestedSong: String,
    isCreated: Boolean,
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
    date: Date
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
});

var User = mongoose.model('User', userSchema); //The schema to be created on mongoDB
