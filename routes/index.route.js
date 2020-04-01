var express = require('express');
var router = express.Router();
var passport = require("passport");

/* GET home page. */
router.get('/', function(req, res){
    res.json({
        availableRoutes: [
            { method: 'GET', url: 'http://localhost:3000/' },
            { method: 'GET', url: 'http://localhost:3000/admin' },
            { method: 'POST', url: 'http://localhost:3000/login' },
            { method: 'POST', url: 'http://localhost:3000/login' },
            { method: 'GET', url: 'http://localhost:3000/users' },
            { method: 'GET', url: 'http://localhost:3000/users/me' },
            { method: 'GET', url: 'http://localhost:3000/illuminati' },
            { method: 'GET', url: 'http://localhost:3000/illuminati/:id' }
        ]
    });
});

router.post("/login", passport.authenticate('local-login',{ session:false}),(req, res)=>{
	return res.json({ user: req.user });
});

router.post('/signup', passport.authenticate('local-register',{ session:false}),(req,res)=>{
    return res.json({ user: req.user })
});

router.get('/admin', function(req, res){
    res.json({ message: 'Success! Je bent een administrator en je mag deze pagina bekijken.' });
});

module.exports = router