import Ember from 'ember';

const { inject: { service }, isEmpty, RSVP } = Ember;

export default Ember.Service.extend({
  session: service('session'),
  store: service(),
  // load() {
  //   if (this.get('session.isAuthenticated')) {
  //     return this.get('store').queryRecord('member', { me: true }).then((user) => {
  //       this.set('member', user);
  //     });
  //   } else {
  //     return Ember.RSVP.resolve();
  //   }
  // }
  load() {
    let userId = this.get('session.data.authenticated.user_id');
    if (!isEmpty(userId)) {
      return this.get('store').findRecord('member', userId).then((user) => {
        this.set('member', user);
      });
    } else {
      return Ember.RSVP.resolve();
    }
  }
});