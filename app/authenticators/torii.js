import Ember from 'ember';
import Torii from 'ember-simple-auth/authenticators/torii';
import ENV from "../config/environment";

const { service } = Ember.inject;

export default Torii.extend({
    torii: service('torii'),
    ajax: service(),
    store: service(),
    cookies: service(),

    github(serverUrl) {
        this.get('ajax').request(serverUrl)
            .then((data) => {
                // toriiData.accessToken = data.token;
                return data.token;
            });
    },

    authenticate(options) {
        console.log("options=>", options);

        return this._super(options).then((toriiData) => {
            console.log("toriiData", toriiData);
            const authCode = toriiData.authorizationCode;
            let serverUrl = '';
            if ( 'github-oauth2' === toriiData.provider ) {
                serverUrl = `${ENV.host}/github_auth?code=${authCode}`;
            } else if ( 'google-oauth2' == toriiData.provider ) {
                serverUrl = `${ENV.host}/google_auth?code=${authCode}`;
            } else if ( 'facebook-oauth2' == toriiData.provider) {
                serverUrl = `${ENV.host}/facebook_auth?code=${authCode}`;
            }

            return this.get('ajax').request(serverUrl)
            .then((data) => {
                toriiData.accessToken = data.token;
                return toriiData;
            });
        });
        // const that = this
        // return this._super(options).then(function(toriiData) {
        //     console.log("options=>", options);
        //     console.log("data:", toriiData);

        //     const authCode = toriiData.authorizationCode;
        //     const serverUrl = `${ENV.host}/github_auth?code=${authCode}`;

        //     that.get('ajax').request(serverUrl)
        //         .then((data) => {
        //             toriiData.accessToken = data.token;
        //             return toriiData;
        //             // return that.get('ajax').request(`https://api.github.com/user?access_token=${data.token}`)
        //         });

        //     // alert(`authorizationCode:\n${data.authorizationCode}\nprovider: ${data.provider}\nredirectUri: ${data.redirectUri}`);
        // });
    }
});
