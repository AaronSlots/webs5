var express = require('express');
var router = express.Router();
var passport = require('passport')

/* GET home page. */
router.get('/', function(req, res){
    let data={
        availableRoutes: [
            { method: 'GET', url: 'http://localhost:3000/', urlParams:[], queryParams:[], explanation:'show all routes of this api' },
            { method: 'GET', url: 'http://localhost:3000/profile', urlParams:[], queryParams:[{name:'token',explanation:'YOUR-JWT',isRequired:true}], explanation:'see your profile' },
            { method: 'GET', url: 'http://localhost:3000/auth/google', urlParams:[], queryParams:[], explanation:'login using google' },
            { method: 'GET', url: 'http://localhost:3000/auth/facebook', urlParams:[], queryParams:[], explanation:'login using facebook' },
            { method: 'GET', url: 'http://localhost:3000/auth/twitter', urlParams:[], queryParams:[], explanation:'login using twitter' },
        ]
    }

    let header = 'text/html'
    if(req.header('Content-Type') != null){
        header = req.header('Content-Type')
    }
    res.header('Content-Type',header);

    switch(header){
        case 'text/html': return res.render('index/index.ejs',data);
        default: return res.json(data);
    }
});

router.get('/profile',passport.authenticate('jwt',{session:false}), function(req, res){
    const token = req.query.token;
    let data = {user:req.user,token:token}
	let header = 'text/html'
    if(req.header('Content-Type') != null){
        header = req.header('Content-Type')
    }
    res.header('Content-Type',header);

    switch(header){
        case 'text/html': return res.render('index/profile.ejs',data);
        default: return res.json(data);
    }
});

module.exports = router;