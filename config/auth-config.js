// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : 'your-secret-clientID-here', // your App ID
        'clientSecret'  : 'your-client-secret-here', // your App Secret
        'callbackURL'   : 'http://localhost:3000/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'       : 'your-consumer-key-here',
        'consumerSecret'    : 'your-client-secret-here',
        'callbackURL'       : 'http://localhost:3000/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : '426270260487-4kklac8sf3tt25032ukmutp6jrivfuua.apps.googleusercontent.com',
        'clientSecret'  : 'e_vTC42XdpRV2Mkx27Ih-IMF',
        'callbackURL'   : 'http://localhost:3000/auth/google/callback'
    }

};
