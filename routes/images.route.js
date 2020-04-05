var express = require('express');
var router = express.Router();
var request = require('request');
var Group = require('../models/group.model').Group
var fs = require('fs');
var imaggaConfig = require('../config/imagga-config')



router.get('/original'), function (req, res){
    let header = 'text/html'
    if(req.header('Content-Type') != null){
        header = req.header('Content-Type')
    }
    res.header('Content-Type',header);
    switch(header){
        case 'text/html': return res.render('images/upload.ejs',{routeId:req.params.id});
        default: return res.json();
    }
}

router.get('/:id/upload', function (req, res) {
    let header = 'text/html'
    if(req.header('Content-Type') != null){
        header = req.header('Content-Type')
    }
    res.header('Content-Type',header);
    switch(header){
        case 'text/html': return res.render('images/upload.ejs',{routeId:req.params.id});
        default: return res.json();
    }
 })


router.post('/',(req, res) =>{
    let baseUrl = imaggaConfig.baseUrl
    let apiKey = imaggaConfig.apiKey
    let apiSecret = imaggaConfig.apiSecret
    let filePath = './resources/fotojpg.jpg';
    let formData = {
        image : fs.createReadStream(filePath),
    };
request.post({url:baseUrl, formData: formData },
        function (error, response, body) {
            let orgImage = {imagga :JSON.parse(body)}   
            let uplImage = [];
            group =new Group({original: orgImage,upload: uplImage}) 
            group.save(); 
            res.json(group.toObject())     
        }).auth(apiKey, apiSecret, true);   

})

router.post('/:id',  (req, res)=>{
    let baseUrl = imaggaConfig.baseUrl
    let apiKey = imaggaConfig.apiKey
    let apiSecret = imaggaConfig.apiSecret
    let language =imaggaConfig.language
    let file = req.files.file
    console.log(file)
    let img = {}
    img.data = file.data
    img.contentType = file.mimetype;
    let formData = { image_base64:Buffer.from(img.data).toString('base64')}
    request.post({url:(baseUrl +"tags?" + language), formData:formData},
    function (error, response, body) {
        Group.findByIdAndUpdate(req.params.id).then(group=>{
            let originalImageResult = group.original.imagga.result.tags
            let image = {imagga :JSON.parse(body),image:img} 
            let tryImage = image.imagga.result.tags
            console.log(tryImage)
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
        })
        res.json('something')
    }
    ).auth(apiKey, apiSecret, true);

    

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