import Ember from 'ember';

export default Ember.Component.extend({
    authManager: Ember.inject.service('session'),

    actions: {
    	facebookLogin: function() {
            this.get('authManager').authenticate('authenticator:torii', 'facebook-oauth2').then(function () {
                alert("logged in");
            });;
            return;
        },
        authenticateSession() {
            this.get('authManager').authenticate('authenticator:torii', 'google-oauth2');
        },
        invalidateSession() {
            this.get('authManager').invalidate();
        },
        authenticate() {
            const { login, password } = this.getProperties('login', 'password');
            this.get('authManager').authenticate('authenticator:oauth2', login, password).catch((reason) => {
                // alert('Obtaining token is: ' + reason.access_token);
                if (reason.access_token !== undefined) {
                    alert('Obtaining token is: ' + reason.access_token);
                } else {
                    alert('Error obtaining token: ' + reason.error);
                }

                this.set('errorMessage', reason.error || reason);
            });
            // this.get('authManager').authenticate('authenticator:oauth2', login, password).then(() => {
            //   alert('Success! Click the top link!');
            // }, (err) => {
            //   alert('Error obtaining token: ' + err.responseText);
            // });
        }
    }
});
