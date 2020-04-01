var mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    name: {type:String, required:true},
    password: {type:String, required:true},
    roles: {type:[String],required:true},
})

exports.User = mongoose.model('User',userSchema)

exports.UserSchema = userSchema;