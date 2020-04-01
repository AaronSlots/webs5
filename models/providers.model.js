var mongoose = require('mongoose');

let providerSchema = mongoose.Schema({
    provider: {type:String, required:true},
    name: {type:String, required:true},
    password: {type:String, required:true},
})

exports.ProviderSchema = providerSchema;