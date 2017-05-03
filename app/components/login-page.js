import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Component.extend({
    authManager: Ember.inject.service('session'),
    torii: Ember.inject.service(),
    ajax: Ember.inject.service(),
    store: Ember.inject.service(),
    cookies: Ember.inject.service(),
    currentMember: Ember.inject.service(),

    _login(login, password) {
        this.get('authManager').authenticate('authenticator:oauth2', login, password).then(() => {
            console.log("reload");
            // this.reload();
            // location.reload();
        }).catch((reason) => {
            // alert('Obtaining token is: ' + reason.access_token);
            if (reason.access_token !== undefined) {
                alert('Obtaining token is: ' + reason.access_token);
            } else {
                alert('Error obtaining token: ' + reason.error);
            }

            this.set('errorMessage', reason.error || reason);
        });
    },

    transitionToPreviousRoute() {
        var previousTransition = this.get('previousTransition');
        if (previousTransition) {
            this.set('previousTransition', null);
            previousTransition.retry();
        } else {
            // Default back to homepage
            this.transitionToRoute('index');
        }
    },

    actions: {
        githubLogin() {
            this.get('authManager').authenticate('authenticator:torii', 'github-oauth2').then(toriiData => {});
            return;
        },
        facebookLogin: function() {
            this.get('authManager').authenticate('authenticator:torii', 'facebook-oauth2').then(function() {
                alert("logged in");
            });;
            return;
        },
        googleLogin() {

            this.get('authManager').authenticate('authenticator:torii', 'google-oauth2').then(toriiData => {});
            return;
        },
        invalidateSession() {
            this.get('authManager').invalidate();
        },

        authenticate() {
            const { login, password } = this.getProperties('login', 'password');
            this._login(login, password);
        },

        closePromptDialog() {

        },
        register() {

            const { login, password } = this.getProperties('login', 'password');
            this.get("authManager")._sign_up(login, password).then(()=>{
                this.get("authManager")._login(login, password).then(()=>{
                    this.get('flashMessages').success('You have signed up successfully');
                });
                this.transitionToPreviousRoute()
            }).catch((reason) => {
                this.set("showErrors", true)
                if (typeof(reason) === 'string') {
                    this.get('flashMessages').danger(reason, { sticky: true })
                }
            })
        },
        transitionToPreviousRoute() {
            var previousTransition = this.get('previousTransition');
            if (previousTransition) {
                this.set('previousTransition', null);
                previousTransition.retry();
            } else {
                // Default back to homepage
                this.transitionToRoute('/');
            }
        }

    }
});
