import Ember from 'ember';
import ENV from "../config/environment";

export default Ember.Controller.extend({
	cart: Ember.inject.service(),
	ajax: Ember.inject.service(),

	actions: {
		remove_from_cart(bookId){
			console.log('bookId', bookId);
			this.get('cart').remove(bookId);
		},

		processStripeToken: function(token) {
			console.log("[DB] token:", token);
			return Ember.$.ajax({
				url: `${ENV.host}/purchase`,
				method: 'POST',
				data: {token}
			}).then(()=>{
				this.get('cart').clear();	
			}).catch((reason)=>{
				this.set('errorMessage', reason.error || reason);
			})
			
	      // Send token to the server to associate with account/user/etc
	    }
	}
});
