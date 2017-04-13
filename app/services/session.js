import DS from 'ember-data';
import ESASession from "ember-simple-auth/services/session";
import ENV from '../config/environment';

export default ESASession.extend({
    authManager: Ember.inject.service('session'),
    torii: Ember.inject.service(),
    ajax: Ember.inject.service(),
    store: Ember.inject.service(),
    cookies: Ember.inject.service(),
    currentMember: Ember.inject.service(),

    _login(login, password) {
        this.get('authManager').authenticate('authenticator:oauth2', login, password).catch((reason) => {
            // alert('Obtaining token is: ' + reason.access_token);
            if (reason.access_token !== undefined) {
                alert('Obtaining token is: ' + reason.access_token);
            } else {
                alert('Error obtaining token: ' + reason.error);
            }

            this.set('errorMessage', reason.error || reason);
        });
    },
    actions: {
        register(userName, password) {
            return new Promise((resolve, reject) => {
                Ember.$.ajax({
                    method: "POST",
                    url: '/members',
                    data: {
                        email: userName,
                        password: password
                    }
                }).then((data) => {
                    var token = data['authentication_token']
                    var user_id = data['user_id']
                    Cookies.set('userId', user_id)
                    Cookies.set('authenticationToken', token)
                    this.initializeFromCookie()
                    resolve()
                }, (reason) => {
                    reject(`Server error: ${Ember.get(reason, 'responseJSON.error')}`)
                })
            })
        }
    }

});
