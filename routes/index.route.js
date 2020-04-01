var express = require('express');
var router = express.Router();

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

router.get('/admin', function(req, res){
    res.json({ message: 'Success! Je bent een administrator en je mag deze pagina bekijken.' });
});

module.exports = router