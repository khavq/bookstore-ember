import PaperToolbar from 'ember-paper/components/paper-toolbar';
import Ember from 'ember';
// export default PaperToolbar;
export default PaperToolbar.extend({
	currentMember: Ember.inject.service(),
	cart: Ember.inject.service(),
	session: Ember.inject.service(),
	actions: {
		invalidateSession() {
	      this.get('session').invalidate();
	    },
	    
	}
});