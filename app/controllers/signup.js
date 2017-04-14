import Ember from 'ember';


export default Ember.Controller.extend({

	session: Ember.inject.service('session'),
	
	actions: {
		save(member) {
			let newMember = member;
			this.get('session')._sign_up(newMember.get('email'), newMember.get('password')).then((data) => {
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
