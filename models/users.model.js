var mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    provider: "google"|"facebook"|"twitter",
    id: {type:String, required:true},
    name: {type:String, required:true},
    email: {type:String, required:true},
    roles: {type:[String],required:true},
})

exports.User = mongoose.model('User',userSchema)

exports.UserSchema = userSchema;