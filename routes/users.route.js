var express = require('express');
var router = express.Router();
var User = require('../models/users.model').User;

/* GET users page. */
router.get('/', function(req, res){
    let user = req.user;
    User.find().then(users=>{
        let data = {users:users,user,user:user}
        let header = 'text/html'
        if(req.header('Content-Type') != null){
            header = req.header('Content-Type')
        }
        res.header('Content-Type',header);
    
        switch(header){
            case 'text/html': return res.render('users/index.ejs',data);
            default: return res.json(data);
        }
    })
});

/* DELETE a user. */
router.delete('/:id', function(req, res){
    User.findByIdAndDelete(req.params.id).then(
        user=>res.redirect('/users?token='+req.query.token)
    );
});

router.put('/:id', function(req, res){
    User.findByIdAndUpdate(req.params.id).then(
        user=>{
            user.role=req.body.role
            return res.redirect('/users?token='+req.query.token)
        }
    );
})

module.exports = router;