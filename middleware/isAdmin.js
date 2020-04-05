module.exports = (req, res, next)=>{
    let user = req.user;
    if(user.role == 'admin'){
        return next();
    }else{
        return res.redirect('/');
    }
}