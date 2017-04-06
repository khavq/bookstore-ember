import Ember from 'ember';
import JSONAPIAdapter from 'ember-data/adapters/json-api';
import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import ENV from 'bookstore-ember/config/emvironment';

const { String: { pluralize, underscore } } = Ember;

export default JSONAPIAdapter.extend(DataAdapterMixin, {
	// namespace: 'api',
	authorizer: 'authorizer:application',
	
	host: ENV.host,

	pathForType(type) {
		return pluralize(underscore(type));
	},

	// authManager: Ember.inject.service(),

	// headers: Ember.computed('authManager.accessToken', function() {
	//   return {
	//     "Authorization": `Bearer ${this.get("authManager.accessToken")}`
	//   };
	// })



});
