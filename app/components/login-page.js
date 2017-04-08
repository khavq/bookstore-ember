import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Component.extend({
    authManager: Ember.inject.service('session'),
    torii: Ember.inject.service(),
    ajax: Ember.inject.service(),
    store: Ember.inject.service(),
    cookies: Ember.inject.service(),

    actions: {
    	githubLogin() {
    		let cookieService = this.get('cookies');
    		return this.get('torii').open('github').then(data => {
		      cookieService.write('authenticationToken', data.accessToken)
		      return this.get('ajax').request(`https://api.github.com/user?access_token=${cookieService.read('authenticationToken')}`)
		    }).then(user => {
		      return Ember.$.ajax({
		        method: "POST",
		        url: `${ENV.host}/members/github`,
		        data: {
		          login: user.login,
		          email: user.email,
		          name: user.name,
		          authentication_token: cookieService.read('authenticationToken'),
		          avatar_url: user.avatar_url,
		          github_id: user.id
		        }
		      })
		    }).then( user =>{
		      cookieService.write('userId', user.user_id)
		      this.initializeFromCookie()
		    });
    	},
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
