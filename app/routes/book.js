import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import InfinityRoute from "ember-infinity/mixins/route";

export default Ember.Route.extend(InfinityRoute, AuthenticatedRouteMixin, {
	queryParams: {
		limit: {
			refreshModel: true
		}
	},

	model() {
		// console.log(params);
		// return this.store.query('book', params);
		return this.infinityModel("book");
	},

	actions: {
		showAll() {
			const total = this.controllerFor('books').get('total');
			this.transitionTo({ queryParams: {limit: total}});
		}
	}
});
