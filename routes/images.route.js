var express = require('express');
var router = express.Router();
var request = require('request');
var Group = require('../models/group.model').Group
var fs = require('fs');
var imaggaConfig = require('../config/imagga-config')

router.post('/', (req, res) =>{
    let baseUrl = imaggaConfig.baseUrl
    let apiKey = imaggaConfig.apiKey
    let apiSecret = imaggaConfig.apiSecret
    let filePath = './resources/fotojpg.jpg';
    console.log("aa")
    let formData = {
        image : fs.createReadStream(filePath),
    };
request.post({url:baseUrl, formData: formData },
        function (error, response, body) {
            console.log("aaa")
            let orgImage = {imagga :JSON.parse(body)}   
            let uplImage = [];
            group =new Group({original: orgImage,upload: uplImage}) 
            group.save(); 
            res.json(group.toObject())     
        }).auth(apiKey, apiSecret, true);   

})

router.post('/:id', (req, res)=>{
    let baseUrl = imaggaConfig.baseUrl
    let apiKey = imaggaConfig.apiKey
    let apiSecret = imaggaConfig.apiSecret
    let filePath = './resources/fotojpg.jpg';
    let formData = {
        image : fs.createReadStream(filePath),
    };
    console.log(req.params.id)
    request.post({url:baseUrl, formData: formData },
    function (error, response, body) {
        Group.findById(req.params.id).then(group=>{
            console.log(group)
            let originalImageResult = group.original.imagga.result.tags
            let image = {imagga :JSON.parse(body)} 
            
            let tryImage = image.imagga.result.tags
            originalImageResult.forEach(obj => {
                tryImage.forEach(obj1 => {
                    if(obj.tag.nl == obj1.tag.nl){
                        let score =   compareImages(obj.confidence, obj1.confidence);
                        console.log(score*100)
                        console.log(obj.tag.nl)
                    }
                })
            });
            group.uploads.push(image);
            group.save((err,g)=>{
                res.json(g.toObject())
            })
        })
    }).auth(apiKey, apiSecret, true);

})

router.get('/')

router.get('/:id')

router.get('/:id/compare/:id2', (req, res)=>{
    Image.findById(req.params.id).then(image =>{
        Image.findById(req.params.id2).then(image2 => {
            let originalImageResult =  image.imagga.result.tags
            let tryImage = image2.imagga.result.tags
            originalImageResult.forEach(obj => {
                tryImage.forEach(obj1 => {
                    if(obj.tag.nl == obj1.tag.nl){
                        let score =   compareImages(obj.confidence, obj1.confidence);
                        console.log(score*100)
                        console.log(obj.tag.nl)
                    }
                })
            });
            return res.json(image.toObject());
        })
    })
})

function compareImages(confidence_of_tag_img_real, confidence_of_tag_img_send){
    if(confidence_of_tag_img_real > confidence_of_tag_img_send){
        return (confidence_of_tag_img_send/confidence_of_tag_img_real) ;
        } 
    else {
        return (confidence_of_tag_img_real/confidence_of_tag_img_send) }
};




module.exports = router;