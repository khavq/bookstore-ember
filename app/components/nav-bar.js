import Ember from 'ember';

export default Ember.Component.extend({
	session: Ember.inject.service(),
	authManager: Ember.inject.service('session'),
	currentMember: Ember.inject.service(),
	
	actions: {
		invalidateSession() {
	      this.get('session').invalidate();
	    }
	}
});
