import Ember from 'ember';

export default Ember.Route.extend({
	queryParams: {
		limit: {
			refreshModel: true
		}
	},

	model(params) {
		console.log(params);
		return this.store.query('book', { limit: 5 });
	},

	actions: {
		showAll() {
			const total = this.controllerFor('books').get('total');
			this.transitionTo({ queryParams: {limit: total}});
		}
	}
});
