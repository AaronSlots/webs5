var express = require('express');
var router = express.Router();
var passport = require("passport");

router.get("/google", passport.authenticate('google',{ session:false,scope:['profile','email']}));

router.get("/google/callback", passport.authenticate('google',{ session:false}),(req, res)=>{
	return res.json({ user: req.user });
});

router.get("/facebook", passport.authenticate('facebook',{ session:false,scope:['public_profile','email']}));

router.get("/facebook/callback", passport.authenticate('facebook',{ session:false}),(req, res)=>{
	return res.json({ user: req.user });
});

router.get("/twitter", passport.authenticate('twitter',{ session:false}));

router.get("/twitter/callback", passport.authenticate('twitter',{ session:false}),(req, res)=>{
	return res.json({ user: req.user });
});

router.get("/logout", (req,res)=>{
    req.logout();
    res.redirect('/');
})

module.exports = router;