import Ember from 'ember';
import JSONAPIAdapter from 'ember-data/adapters/json-api';
import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

const { String: { pluralize, underscore } } = Ember;

export default JSONAPIAdapter.extend(DataAdapterMixin, {
	authorizer: 'authorizer:application',
	
	pathForType(type) {
		return pluralize(underscore(type));
	},

	authManager: Ember.inject.service(),

	headers: Ember.computed('authManager.accessToken', function() {
	  return {
	    "Authorization": `Bearer ${this.get("authManager.accessToken")}`
	  };
	})



});
