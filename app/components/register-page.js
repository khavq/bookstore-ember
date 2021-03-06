import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Component.extend(EmberValidations, {
    // init() {
    //     this._super(...arguments);
    //     this.validations = Ember.getOwner(this).lookup('EmberValidations');
    //     // this.get('parent').set('foo', 'bar');
    // },

    showErrors: false,

    session: Ember.inject.service(),

    // validations: {
    //     userName: {
    //         presence: true
    //     },
    //     password: {
    //         presence: true,
    //         length: { minimum: 6 }
    //     }
    // },

    actions: {
        register: function() {

            let { userName, password } = this.getProperties('userName', 'password');
            return this.get("session").register(userName, password)
            this.validate().then(() => {
            	console.log("register", userName, password);
                return this.get("session").register(userName, password)
            }).then(() => {
                this.get('flashMessages').success('You have signed up successfully')
                this.transitionToPreviousRoute()
            }).catch((reason) => {
                this.set("showErrors", true)
                if (typeof(reason) === 'string') {
                    this.get('flashMessages').danger(reason, { sticky: true })
                }
            })
        }

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
    }

});
