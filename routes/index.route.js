var express = require('express');
var router = express.Router();
var passport = require('passport')

/* GET home page. */
router.get('/', function(req, res){
    let availableRoutes={
        availableRoutes: [
            { method: 'GET', url: 'http://localhost:3000/' },
            { method: 'GET', url: 'http://localhost:3000/profile' },
            { method: 'GET', url: 'http://localhost:3000/auth/google' },
            { method: 'GET', url: 'http://localhost:3000/auth/facebook' },
            { method: 'GET', url: 'http://localhost:3000/auth/twitter' },
        ]
    }

    res.header('Content-Type',req.header('Content-Type'));

    switch(req.header('Content-Type')){
        case 'text/html': return res.render('index/index.ejs',availableRoutes);
        default: return res.json(availableRoutes);
    }
});

router.get('/profile',passport.authenticate('jwt',{session:false}), function(req, res){
    const token = req.query.token;
	return res.render('index/profile.ejs',{user:req.user,token:token})
});

module.exports = router;