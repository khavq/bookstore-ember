import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
const { service } = Ember.inject;

export default Ember.Route.extend(ApplicationRouteMixin, {
    currentMember: service(),

    beforeModel() {
        return this._loadCurrentUser();
    },

    sessionAuthenticated() {
        this._super(...arguments);
        this._loadCurrentUser();
    },

    _loadCurrentUser() {
        return this.get('currentMember').load().catch(() => this.get('session').invalidate());
    },
    actions: {
        blurBackground(blur) {
            this.controllerFor('application').set('blur', blur);
        }
    }
});
