var mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    provider: "google"|"facebook"|"twitter",
    id: {type:String, required:true},
    name: {type:String, required:true},
    email: {type:String, required:true},
    role: "admin"|"user"
})

exports.User = mongoose.model('User',userSchema)

exports.UserSchema = userSchema;