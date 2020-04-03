var mongoose = require('mongoose');

let pictureSchema = mongoose.Schema({
    pictureUrl: {type:String, required:true},
    result: {type:resultSchema, required:true}
});

let tagSchema = mongoose.Schema({
    confidence: {type:Number, required:true},
    tag: {type:objectSchema, required:true}    
});

let objectSchema = mongoose.Schema({
    en: {type:String, required:true}
});

let resultSchema = mongoose.Schema({
    tags: {type:[tagSchema], required:true},
    status: {type:statusSchema, required:true}
});

let statusSchema = mongoose.Schema({
    text: {type:String, required:false},
    type: {type:String, required:true}
});

exports.Picture = mongoose.model('Picture',pictureSchema);

exports.ResultSchema = resultSchema;