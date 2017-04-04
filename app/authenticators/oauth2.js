import OAuth2PasswordGrant from 'ember-simple-auth/authenticators/oauth2-password-grant';

export default OAuth2PasswordGrant.extend({
  serverTokenEndpoint: "http://ec2-52-42-253-200.us-west-2.compute.amazonaws.com/oauth/token"
});