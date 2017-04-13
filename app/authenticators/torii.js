import Ember from 'ember';
import Torii from 'ember-simple-auth/authenticators/torii';
import ENV from "../config/environment";

const { service } = Ember.inject;

export default Torii.extend({
    torii: service('torii'),
    ajax: service(),
    store: service(),
    cookies: service(),
    authManager: service('session'),
    restore(data) {
        console.log("[DB] authenticators torii RESTORE ");
    },

    authenticate(options) {
        console.log("options=>", options);

        return this._super(options).then((toriiData) => {
            const authCode = toriiData.authorizationCode;
            let serverUrl = '';
            let provider = toriiData.provider
            serverUrl = `${ENV.host}/github_auth?code=${authCode}&provider=${provider}`;

            return this.get('ajax').request(serverUrl)
            .then((data) => {
                toriiData.urs = data.member.user_name
                toriiData.email = data.member.email
                toriiData.access_key = data.member.authentication_token
                // login
                this.get('authManager')._login(toriiData.email, toriiData.access_key)
                return toriiData;
            });
        });
    },

    invalidate(data) {
        console.log("[DB] authenticators torii INVALIDATE ");
    }
});
