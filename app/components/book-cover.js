import Ember from 'ember';

export default Ember.Component.extend({
	cart: Ember.inject.service(),

	actions: {
		add_to_cart(id){
			console.log("id:",id);
			this.get('cart').add(id);
		},
		remove_from_cart(id){
			this.get('cart').remove(id);
		},
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
