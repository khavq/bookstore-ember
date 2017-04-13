import Devise from 'ember-simple-auth/authenticators/devise';
import ENV from '../config/environment';

export default Devise.extend({
	serverTokenEnpoint: `${ENV.host}/members/sign_up`
})