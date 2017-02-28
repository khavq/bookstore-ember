import Ember from 'ember';
// const { computed } = Ember;
// import pagedArray from 'ember-cli-pagination/computed/paged-array';

export default Ember.Controller.extend({
	// queryParams: ['limit'],
	// limit: 5,

	// total: computed('model.meta', function(){
	// 	return this.get('model.meta').total;
	// }),

	// showAll: computed('total', 'model', function() {
	// 	return this.get('total') > this.get('model.length');
	// })
	handleFilterEntry: computed(function(){

	}),

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



