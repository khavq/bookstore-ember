import Ember from 'ember';
const { service } = Ember.inject;


export default Ember.Component.extend({

	session: service('session'),

	actions: {
		submit() {
			let member = this.get('member');
			// console.log("member", member);
			this.attrs.triggerSave(member);
		}
	}
});
