var mongoose = require('mongoose');

let pictureSchema = mongoose.Schema({
    pictureUrl: {type:String, required:true}
});