var User = require('../models/users.model.js').User;
var passport = require("passport");
var configAuth = require('./auth-config');
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy  = require('passport-twitter').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var JWTStrategy = require('passport-jwt').Strategy;
var ExtractJWT = require('passport-jwt').ExtractJwt;
var secretJWT = require('./jwt-config').secret;

// =========================================================================
// FACEBOOK ================================================================
// =========================================================================
passport.use('facebook',new FacebookStrategy({
    clientID        : configAuth.facebookAuth.clientID,
    clientSecret    : configAuth.facebookAuth.clientSecret,
    callbackURL     : configAuth.facebookAuth.callbackURL
},
function(token, refreshToken, profile, done) {
    process.nextTick(function() {
        
        // try to find the user based on their facebook id
        User.findOne({ 'id' : profile.id, 'provider':'facebook' }, function(err, user) {
            if (err)
                return done(err,false);
            if (user) {
                return done(null, user);
            } else {
                let registered = new User();

                registered.provider = "facebook"
                registered.id = profile.id
                registered.name  = profile.name.givenName;
                registered.email = profile.emails[0].value; 
                registered.roles = []

                registered.save(function(err) {
                    if (err){
                        return done(err, false);
                    }
                    return done(null, registered);
                });
            }
        });
    });

}));

// =========================================================================
// TWITTER =================================================================
// =========================================================================
passport.use('twitter',new TwitterStrategy({
    consumerKey     : configAuth.twitterAuth.consumerKey,
    consumerSecret  : configAuth.twitterAuth.consumerSecret,
    callbackURL     : configAuth.twitterAuth.callbackURL,
},
function(token, refreshToken, profile, done) {
    process.nextTick(function() {
        
        // try to find the user based on their twitter id
        User.findOne({ 'id' : profile.id, 'provider':'twitter' }, function(err, user) {
            if (err)
                return done(err,false);
            if (user) {
                return done(null, user);
            } else {
                let registered = new User();

                registered.provider = "twitter"
                registered.id = profile.id
                registered.name  = profile.displayName;
                registered.email = profile.emails[0].value;
                registered.roles = []

                registered.save(function(err) {
                    if (err){
                        return done(err, false);
                    }
                    return done(null, registered);
                });
            }
        });
    });

}));

// =========================================================================
// GOOGLE ==================================================================
// =========================================================================
passport.use('google',new GoogleStrategy({
    clientID        : configAuth.googleAuth.clientID,
    clientSecret    : configAuth.googleAuth.clientSecret,
    callbackURL     : configAuth.googleAuth.callbackURL,
},
function(token, refreshToken, profile, done) {
    process.nextTick(function() {
        
        // try to find the user based on their google id
        User.findOne({ 'id' : profile.id, 'provider':'google' }, function(err, user) {
            if (err)
                return done(err,false);
            if (user) {
                return done(null, user);
            } else {
                let registered = new User();

                registered.provider = "google"
                registered.id = profile.id
                registered.name  = profile.displayName;
                registered.email = profile.emails[0].value;
                registered.roles = []

                registered.save(function(err) {
                    if (err){
                        return done(err, false);
                    }
                    return done(null, registered);
                });
            }
        });
    });

}));

// =========================================================================
// JWT =====================================================================
// =========================================================================

const opts = {
    jwtFromRequest: ExtractJWT.fromUrlQueryParameter('token'),
    secretOrKey: secretJWT
}

passport.use('jwt',new JWTStrategy(opts,(payload,done)=>{
    User.findOne({'id':payload.id,'provider':payload.provider},(err,user)=>{
        if(err){
            return done(err,false);
        } else if (user) {
            return done(null,user);
        } else {
            return done(null,false);
        }
    })
}));