import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Controller.extend({

	session: Ember.inject.service('session'),
	ajax: Ember.inject.service(),

	actions: {
		save(member) {
			let newMember = member;
			console.log("newMember", newMember);
			// this.get('session')._sign_up()
			// newMember.save()
			Ember.$.ajax({ 
				method: 'POST',
				url: `${ENV.host}/members`,
				member:{ email: newMember.get('email'), 
				         password: newMember.get('password')
				}
			}).ther((data) => {
				this.set('errorMessage', data);
			}).then(() => {
				this.get('session').authenticate('authenticator:oauth2', 
					newMember.get('email'), newMember.get('password'))
				.catch((reason) => {
					// this.set('errorMessage', reason.error || reason );
				})
			})
		}
	}
});
