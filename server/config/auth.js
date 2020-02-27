module.exports = {

	// Express App
    // 'facebookAuth' : {
    //     'clientID'      : '1903191953042147', // your App ID
    //     'clientSecret'  : '5cca17782e72b62a68f7420010ec7484', // your App Secret
    //     'callbackURL'   : 'http://localhost:8080/auth/facebook/callback',
    //     'profileURL'    : 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
    //     'profileFields' : ['id', 'email', 'name'] // For requesting permissions from Facebook API
    // },
    // Express - Test App
    'facebookAuth' : {
        'clientID'      : '1855419587880428', // your App ID
        'clientSecret'  : '4878553a250968e8cb0c02a16405cada', // your App Secret
        'callbackURL'   : 'http://localhost:8080/auth/facebook/callback',
        'profileURL'    : 'https://graph.facebook.com/v2.5/me?',
        'profileFields' : ['id', 'displayName', 'email', 'birthday', 'friends', 'first_name', 'last_name', 'middle_name', 'gender', 'link', 'picture.type(large)'] // For requesting permissions from Facebook API
    }
};