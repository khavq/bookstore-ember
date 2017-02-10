import Ember from 'ember';

export default Ember.Component.extend({
	actions: {
		open() {
			this.get('book').reload().then(() => {
				this.set('isShowingModal', true);
				console.log("isShowingModal=true");
				this.get('blurBackground')(true);
			});
			
		},

		close() {
			this.set('isShowingModal', false);
			this.get('blurBackground')(false);
		}
	}
});
