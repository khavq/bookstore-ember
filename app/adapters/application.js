import Ember from 'ember';
import JSONAPIAdapter from 'ember-data/adapters/json-api';
import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import ENV from '../config/environment';

const { String: { pluralize, underscore } } = Ember;

export default JSONAPIAdapter.extend(DataAdapterMixin, {
    // namespace: 'api',
    authorizer: 'authorizer:application',
    headers: Ember.computed(function() {
        var token = Ember.$('meta[name="csrf-token"]').attr('content');

        return { "X-CSRF-Token": token };
    }),
    host: ENV.host,
    // host: 'http://ec2-52-42-253-200.us-west-2.compute.amazonaws.com/api/v1',

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
