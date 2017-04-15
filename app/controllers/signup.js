import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations, {
	showErrors: false,
    session: Ember.inject.service('session'),
    // validations: {
    //     email: {
    //         presence: true
    //     },
    //     password: {
    //         presence: true,
    //         length: { minimum: 6 }
    //     }
    // },
    

    actions: {
        signup(member) {
            let { email, password } = this.getProperties('email', 'password');
            this.validate().then(() => {
                return this.get("session")._sign_up(email, password)
            }).then(() => {
                this.get('flashMessages').success('You have signed up successfully')
                this.transitionToPreviousRoute()
            }).catch((reason) => {
                this.set("showErrors", true)
                if (typeof(reason) === 'string') {
                    this.get('flashMessages').danger(reason, { sticky: true })
                }
            })


            // this.get('session')._sign_up(newMember.get('email'), newMember.get('password')).then((data) => {
            //     this.set('errorMessage', data);
            // }).then(() => {
            //     this.get('session').authenticate('authenticator:oauth2',
            //             newMember.get('email'), newMember.get('password'))
            //         .catch((reason) => {
            //             // this.set('errorMessage', reason.error || reason );
            //         })
            // })

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
