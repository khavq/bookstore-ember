import Ember from 'ember';

export default Ember.Controller.extend({
	cart: Ember.inject.service(),
	currentMember: Ember.inject.service(),
	actions: {
	    filterByCity(param) {
	      if (param !== '') {
	        return this.get('store').query('rental', { city: param });
	      } else {
	        return this.get('store').findAll('rental');
	      }
	    }
	  }
});
