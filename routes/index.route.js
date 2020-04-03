var express = require('express');
var router = express.Router();
var passport = require('passport')

/* GET home page. */
router.get('/', function(req, res){
    res.json({
        availableRoutes: [
            { method: 'GET', url: 'http://localhost:3000/' },
            { method: 'GET', url: 'http://localhost:3000/admin' },
            { method: 'GET', url: 'http://localhost:3000/auth/google' },
        ]
    });
});

router.get('/profile',passport.authenticate('jwt',{session:false}), function(req, res){
    const token = req.query.token;
	return res.render('profile.ejs',{user:req.user,token:token})
});

module.exports = router