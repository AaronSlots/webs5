var express = require('express');
var router = express.Router();
var request = require('request');



const baseUrl = 'https://api.imagga.com/v2/tags?image_url=';
const apiKey = 'acc_0dbc8dcbf0a181a';
const apiSecret = '69f2658b95f1293390d95967dbf52ad0';
const imageUrl = 'https://docs.imagga.com/static/images/docs/sample/japan-605234_1280.jpg';
const apiUrl = baseUrl+imageUrl;


request.get('https://api.imagga.com/v2/tags?image_url='+encodeURIComponent(imageUrl), function (error, response, body) {
    console.log('Status:', response.statusCode);
    console.log('Headers:', JSON.stringify(response.headers));
    console.log('Response:', body);
}).auth(apiKey, apiSecret, true);