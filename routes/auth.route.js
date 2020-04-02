var express = require('express');
var router = express.Router();
var passport = require("passport");
var secretJWT = require('../config/jwt-config').secret;
var jwt = require('jsonwebtoken')

router.get("/google", passport.authenticate('google',{ session:false,scope:['profile','email']}));

router.get("/google/callback", passport.authenticate('google',{ session:false}),(req, res)=>{
	const user = {
		id:req.user.id,
		provider:req.user.provider,
	}
	const token = jwt.sign(user,secretJWT,{expiresIn:'24h'});
	return res.redirect('/profile?token='+token)
});

router.get("/facebook", passport.authenticate('facebook',{ session:false,scope:['public_profile','email']}));

router.get("/facebook/callback", passport.authenticate('facebook',{ session:false}),(req, res)=>{
	const token = jwt.sign(user,secretJWT,{expiresIn:'24h'});
	return res.redirect('/profile?token='+token)
});

router.get("/twitter", passport.authenticate('twitter',{ session:false}));

router.get("/twitter/callback", passport.authenticate('twitter',{ session:false}),(req, res)=>{
	const token = jwt.sign(user,secretJWT,{expiresIn:'24h'});
	return res.redirect('/profile?token='+token)
});

router.get("/logout", (req,res)=>{
    req.logout();
    res.redirect('/');
})

module.exports = router;