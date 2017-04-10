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
    githubLogin() {
            let cookieService = this.get('cookies');
            // return this.get('torii').open('github')
            
            return this.get('torii').open('github').then(data => {
                cookieService.write('authenticationToken', data.accessToken)
                return this.get('ajax').request(`https://api.github.com/user?access_token=${cookieService.read('authenticationToken')}`)
            }).then(user => {
                return Ember.$.ajax({
                    method: "POST",
                    url: `${ENV.host}/members`,
                    data: {
                        
                        "utf8": "✓",
                        "api_v1_member":{
                            "user_name":`${user.login}`,
                            "email":`${user.email}`,
                            "avatar_url": `${user.avatar_url}`,
                            "full_name": `${user.name}`,
                            "authentication_token": `cookieService.read('authenticationToken')`,
                            "provider_id": `${user.id}`
                        }
                        
                    }
                })
            }).then(user => {
                return this.get('currentMember').set_current_member(user)
                // cookieService.write('userId', user.user_id)
                // this.initializeFromCookie()
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
