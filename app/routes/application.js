import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';


export default Ember.Route.extend(ApplicationRouteMixin, {
	actions: {
		blurBackground(blur) {
			this.controllerFor('application').set('blur', blur);
		}
	}
});
