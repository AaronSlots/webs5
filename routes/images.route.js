var express = require('express');
var router = express.Router();
var request = require('request');
var Image = require('../models/image.model').Image;
var fs = require('fs');

router.get('/', (req, res)=>{
    let baseUrl = 'https://api.imagga.com/v2/tags'
    let apiKey = 'acc_0dbc8dcbf0a181a';
    let apiSecret = '69f2658b95f1293390d95967dbf52ad0';
    let filePath = 'https://docs.imagga.com/static/images/docs/sample/japan-605234_1280.jpg';
    request.get(baseUrl+"?image_url="+imageUrl+"&language=nl",function (error,response,body) {
        let image = new Image({imageUrl:imageUrl, imagga:JSON.parse(body)})
        image.save();
        return res.json(image.toObject());
    }).auth(apiKey, apiSecret, true);
})

router.get('/:image1/compare/:image2', (req,res,)=>{
    let image1 = req.params.image1;
    let image2 = req.params.image2;
})

module.exports = router;