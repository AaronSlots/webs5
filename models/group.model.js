var mongoose = require('mongoose');

let objectSchema = mongoose.Schema({
    nl: {type:String, required:true}
});

let tagSchema = mongoose.Schema({
    confidence: {type:Number, required:true},
    tag: {type:objectSchema, required:true}    
});

let statusSchema = mongoose.Schema({
    text: {type:String, required:false},
    type: {type:String, required:true}
});

let tagsSchema = mongoose.Schema({
    tags: {type:[tagSchema], required:true},
});

let imaggaSchema = mongoose.Schema({
    result: {type: tagsSchema, required:true},
    status: {type:statusSchema, required:true}
})

let imageSchema = mongoose.Schema({
    //image: { data: Buffer, contentType: String, required: true},
    imagga: {type:imaggaSchema, required:true}
});

let groupSchema = mongoose.Schema({
    original: { type:imageSchema, required: true},
    uploads: {type:[imageSchema], required:true}
});

exports.Group = mongoose.model('Group',groupSchema);