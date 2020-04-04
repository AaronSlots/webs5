var express = require('express');
var router = express.Router();
var request = require('request');
var Image = require('../models/image.model').Image;
var OriginalImage = require('../models/image.model').OriginalImage;
var fs = require('fs');


router.get('/', (req, res)=>{
    let baseUrl = 'https://api.imagga.com/v2/tags'
    let apiKey = 'acc_0dbc8dcbf0a181a';
    let apiSecret = '69f2658b95f1293390d95967dbf52ad0';
    let filePath = './resources/fotojpg.jpg';
    let language = '?language=nl';
    let formData = {
        image : fs.createReadStream(filePath)
    };
    request.post({url:baseUrl + language, formData: formData },
    function (error, response, body) {
        let image = new Image({imagga:JSON.parse(body)})
        image.save();

        let originalImageResult =  image.imagga.result.tags
        originalImageResult.forEach(obj => {
            console.log("ewa")
        });
        return res.json(image.toObject());
    }).auth(apiKey, apiSecret, true);

})

router.get('/compare', (req,res,)=>{
    let originalImageResult =  Image.imagga.result
    originalImageResult.forEach(element => {
        console.log("ewa")
    });
});

module.exports = router;