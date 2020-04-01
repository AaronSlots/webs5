var User = require('../models/users.model.js').User;
var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;

passport.use('local-login', new LocalStrategy(function (username, password, done) {
    User.findOne({ "providers.name": username, "providers.provider":"local" },user => {
        if (user && user.password === password) {
            done(null, user);
        } else {
            done(null, false);
        }
    });
}));

passport.use('local-register', new LocalStrategy(function (username, password, done){
    User.findOne({ name: username },user => {
        if(!user){
            let registered = new User({providers:[{provider:'local',name:username,password:password}],roles:[]});
            registered.save((err)=>{
                if(err){return done(err, false)}
                return done(null, registered);
            })
        } else {
            return done (null, false)
        }
    });
}))