import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('book', { path: '/'});
  this.route('author', { path: '/author/:author_id'});
  this.route('publishing-houses');
  this.route('dashboard');
  this.route('login');
  this.route('register');
  this.route('oauth2callback');
  this.route('signup');
});

export default Router;
