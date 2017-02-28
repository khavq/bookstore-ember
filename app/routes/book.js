import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import InfinityRoute from "ember-infinity/mixins/route";
// import RouteMixin from 'ember-cli-pagination/remote/route-mixin';


export default Ember.Route.extend(InfinityRoute, AuthenticatedRouteMixin, {
	// queryParams: {
	// 	limit: {
	// 		refreshModel: true
	// 	}
	// },
	totalPagesParam: "meta.total-pages",    // instead of "meta.total_pages"

	model(params) {
		// console.log(params);
		// return this.store.query('book', params);
		//var search = this.get('txt_search');
		return this.infinityModel("book", { perPage: 12, startingPage: 1, search: "" });
		// return this.findPaged('book', params);
	},

	actions: {
		showAll() {
			// const total = this.controllerFor('books').get('total');
			// this.transitionTo({ queryParams: {limit: total}});
		},

		handleFilterEntry() {
	      // let filterInputValue = this.get('value');
	      // let filterAction = this.get('filter');
	      // filterAction(filterInputValue).then((filterResults) => this.set('results', filterResults));
	    }
	}
});
