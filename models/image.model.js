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
    imagga: {type:imaggaSchema, required:true}
});

let originalImageSchema = mongoose.Schema({
   // image: { data: Buffer, contentType: String, required: true},
    imageData: {type: imageSchema, required:true} 
})

exports.Image = mongoose.model('Image',imageSchema);
exports.OriginalImage = mongoose.model('OriginalImage', originalImageSchema);