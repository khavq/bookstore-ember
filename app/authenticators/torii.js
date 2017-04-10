import Ember from 'ember';
import Torii from 'ember-simple-auth/authenticators/torii';
import ENV from "../config/environment";

const { service } = Ember.inject;

export default Torii.extend({
    torii: service('torii'),
    ajax: service(),
    store: service(),
    cookies: service(),

    authenticate(options) {
    	const that = this
        return this._super(options).then(function(data) {
            console.log("options=>", options);
            console.log("data:", data);

            const authCode = data.authorizationCode;
            const serverUrl = `${ENV.host}/github_auth?code=${authCode}`;

            that.get('ajax').request(serverUrl)
                .then((data) => {
                    // toriiData.accessToken = data.token;
                    // return toriiData;
                    return this.get('ajax').request(`https://api.github.com/user?access_token=${data.token}`)
                });

            // alert(`authorizationCode:\n${data.authorizationCode}\nprovider: ${data.provider}\nredirectUri: ${data.redirectUri}`);
        }).then(function(member) {

        });
    }
});
