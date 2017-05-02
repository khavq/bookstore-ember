import Ember from 'ember';

const { inject: { service }, isEmpty, RSVP } = Ember;

export default Ember.Service.extend({
  session: service('session'),
  store: service(),
  load() {
    if (this.get('session.isAuthenticated')) {
      return this.get('store').queryRecord('member', { me: true }).then((user) => {
        this.set('member', user);
        // location.reload();
      });
    } else {
      return Ember.RSVP.resolve();
    }
  },

  set_current_member(member) {
    console.log("set_current_member MEMBER => ", member);
    this.set('member', member);
  }
});