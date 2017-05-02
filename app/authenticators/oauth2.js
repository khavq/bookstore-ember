import OAuth2PasswordGrant from 'ember-simple-auth/authenticators/oauth2-password-grant';
import ENV from '../config/environment';

export default OAuth2PasswordGrant.extend({
    serverTokenEndpoint: `${ENV.oauth_url}/oauth/token`,
    // authenticate(login, password) {
    //     console.log("options=>", login, password);

    //     return this._super(login, password).then((toriiData) => {
    //         console.log("toriiData:", toriiData);
    //     });
    // },
});
