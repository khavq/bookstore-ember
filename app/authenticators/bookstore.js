import Base from 'ember-simple-auth/authenticators/base';
import ENV from '../config/environment';

export default Base.extend({

    serverTokenEndpoint: `${ENV.oauth_url}/oauth/token`,
    authenticate(login, password) {
        console.log("options=>", login, password);

        return this._super(login, password).then((toriiData) => {
            console.log("toriiData:", toriiData);
        });
    },
    invalidate(data) {
    	
    }
});
