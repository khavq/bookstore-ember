import DS from 'ember-data';
import ESASession from "ember-simple-auth/services/session";

export default ESASession.extend({

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
