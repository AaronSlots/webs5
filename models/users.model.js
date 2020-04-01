var mongoose = require('mongoose');
var ProviderSchema = require('./providers.model').ProviderSchema

let userSchema = mongoose.Schema({
    providers: {type:[ProviderSchema],required:true},
    roles: {type:[String],required:true},
})

exports.User = mongoose.model('User',userSchema)

exports.UserSchema = userSchema;