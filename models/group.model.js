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
    data:{type: Buffer,required:true}, 
    contentType: {type:String,required:true},
})

let dataSchema = mongoose.Schema({
    image: {type:imageSchema,required:true},
    imagga: {type:imaggaSchema, required:true}
});

let groupSchema = mongoose.Schema({
    original: { type:dataSchema, required: true},
    uploads: {type:[dataSchema], required:true}
});

exports.Group = mongoose.model('Group',groupSchema);