/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'bookstore',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created

    },

    host: '',
    oauth_url: ''
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    // ENV.APP.HTTP_PROXY = 'http://ec2-52-42-253-200.us-west-2.compute.amazonaws.com/api/v1';
    ENV.host = 'http://localhost:3000/api/v1';
    ENV.oauth_url = 'http://localhost:3000';
    ENV.stripe = {
      key: "pk_test_1gvQxTVpoRRczB27Qd3py8In"
    };
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    // ENV.APP.HTTP_PROXY = 'http://ec2-52-42-253-200.us-west-2.compute.amazonaws.com/api/v1';
    ENV.oauth_url = 'https://cryptic-everglades-79059.herokuapp.com';
    ENV.host = ENV.oauth_url + '/api/v1';
    
    ENV.stripe = {
      key: "pk_test_1gvQxTVpoRRczB27Qd3py8In"
    };
  }

  ENV['ember-simple-auth'] = {
    routeAfterAuthentication: '/'
  }

  ENV.torii = {
    sessionServiceName: 'session',
    providers: {
      'google-oauth2': {
        apiKey: "599414694595-aon8h33baausc2il1u9ogi8h3se8ldbb.apps.googleusercontent.com",
        redirectUri: "http://localhost:4200/oauth2callback"
      },
      'facebook-oauth2': {
        apiKey: '1850449095224387',
        redirectUri: 'http://localhost:4200/'
      },
      'github-oauth2': {
        apiKey: "cb663cec8eb622a949fb",
        redirectUri: 'http://localhost:4200'
        // redirectUri: 'http://localhost:3000/api/v1/github_oauth?code='
      }
    },

  };


  return ENV;
};
