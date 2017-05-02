import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
const { service } = Ember.inject;

export default Ember.Route.extend(ApplicationRouteMixin, {
    currentMember: service(),
    _showLogin: false,
    _needReload: false,
    beforeModel() {
        return this._loadCurrentUser();
    },
    afterModel() {
        // if (this.get('_needReload')) {
        //     location.reload();
        //     this.get('_needReload')(false);
        // }
        
        console.log("after model");
    },

    sessionAuthenticated() {
        console.log("sessionAuthenticated");
        this._super(...arguments);
        this._loadCurrentUser().then(()=>{location.reload();});
    },

    _loadCurrentUser() {
        return this.get('currentMember').load().catch(() => this.get('session').invalidate());
    },
    actions: {
        blurBackground(blur) {
            this.controllerFor('application').set('blur', blur);
        },
        showLoginForm() {
            this.controllerFor('application').set('_showLogin', true);
        },
        hideLoginForm() {
            this.controllerFor('application').set('_showLogin', false);
        },
        logout() {
            this.get('session').invalidate();
        }
    }
});
