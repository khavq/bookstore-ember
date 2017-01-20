"use strict";

/* jshint ignore:start */



/* jshint ignore:end */

define('bookstore/adapters/application', ['exports', 'ember', 'ember-data/adapters/json-api'], function (exports, _ember, _emberDataAdaptersJsonApi) {
	var _Ember$String = _ember['default'].String;
	var pluralize = _Ember$String.pluralize;
	var underscore = _Ember$String.underscore;
	exports['default'] = _emberDataAdaptersJsonApi['default'].extend({
		pathForType: function pathForType(type) {
			return pluralize(underscore(type));
		}
	});
});
define('bookstore/app', ['exports', 'ember', 'bookstore/resolver', 'ember-load-initializers', 'bookstore/config/environment'], function (exports, _ember, _bookstoreResolver, _emberLoadInitializers, _bookstoreConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _bookstoreConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _bookstoreConfigEnvironment['default'].podModulePrefix,
    Resolver: _bookstoreResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _bookstoreConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('bookstore/helpers/app-version', ['exports', 'ember', 'bookstore/config/environment'], function (exports, _ember, _bookstoreConfigEnvironment) {
  exports.appVersion = appVersion;
  var version = _bookstoreConfigEnvironment['default'].APP.version;

  function appVersion() {
    return version;
  }

  exports['default'] = _ember['default'].Helper.helper(appVersion);
});
define('bookstore/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('bookstore/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('bookstore/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'bookstore/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _bookstoreConfigEnvironment) {
  var _config$APP = _bookstoreConfigEnvironment['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(name, version)
  };
});
define('bookstore/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('bookstore/initializers/data-adapter', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('bookstore/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/-private/core'], function (exports, _emberDataSetupContainer, _emberDataPrivateCore) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.Controller.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('bookstore/initializers/export-application-global', ['exports', 'ember', 'bookstore/config/environment'], function (exports, _ember, _bookstoreConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_bookstoreConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _bookstoreConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_bookstoreConfigEnvironment['default'].modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('bookstore/initializers/injectStore', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('bookstore/initializers/store', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: function initialize() {}
  };
});
define('bookstore/initializers/transforms', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: function initialize() {}
  };
});
define("bookstore/instance-initializers/ember-data", ["exports", "ember-data/-private/instance-initializers/initialize-store-service"], function (exports, _emberDataPrivateInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataPrivateInstanceInitializersInitializeStoreService["default"]
  };
});
define('bookstore/models/author', ['exports', 'ember-data', 'bookstore/models/publisher'], function (exports, _emberData, _bookstoreModelsPublisher) {
	exports['default'] = _bookstoreModelsPublisher['default'].extend({
		books: _emberData['default'].hasMany('books')
	});
});
define('bookstore/models/book', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    title: _emberData['default'].attr('string'),
    price: _emberData['default'].attr('number'),
    author: _emberData['default'].belongsTo('author', { inverse: 'books' }),
    publisher: _emberData['default'].belongsTo('publisher', { polymorphic: true, inverse: 'published' })
  });
});
define('bookstore/models/publisher', ['exports', 'ember-data'], function (exports, _emberData) {
	exports['default'] = _emberData['default'].Model.extend({
		name: _emberData['default'].attr('string'),
		discount: _emberData['default'].attr('number'),
		published: _emberData['default'].hasMany('book')
	});
});
define('bookstore/models/publishing-house', ['exports', 'bookstore/models/publisher'], function (exports, _bookstoreModelsPublisher) {
  exports['default'] = _bookstoreModelsPublisher['default'].extend();
});
define('bookstore/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('bookstore/router', ['exports', 'ember', 'bookstore/config/environment'], function (exports, _ember, _bookstoreConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _bookstoreConfigEnvironment['default'].locationType,
    rootURL: _bookstoreConfigEnvironment['default'].rootURL
  });

  Router.map(function () {
    this.route('book', { path: '/' });
    this.route('author', { path: '/author/:author_id' });
    this.route('publishing-houses');
  });

  exports['default'] = Router;
});
define('bookstore/routes/author', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('bookstore/routes/book', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('bookstore/routes/publishing-houses', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('bookstore/serializers/application', ['exports', 'ember-data'], function (exports, _emberData) {
	exports['default'] = _emberData['default'].JSONAPISerializer.extend({
		payloadKeyFromModelName: function payloadKeyFromModelName(modelName) {
			return singularize(capitalize(modelName));
		}
	});
});
define('bookstore/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define("bookstore/templates/author", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "xsEXuSMr", "block": "{\"statements\":[[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "bookstore/templates/author.hbs" } });
});
define("bookstore/templates/book", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "5Of2VOYr", "block": "{\"statements\":[[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "bookstore/templates/book.hbs" } });
});
define("bookstore/templates/publishing-houses", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "pUHHrBPa", "block": "{\"statements\":[[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "bookstore/templates/publishing-houses.hbs" } });
});
/* jshint ignore:start */



/* jshint ignore:end */

/* jshint ignore:start */

define('bookstore/config/environment', ['ember'], function(Ember) {
  var prefix = 'bookstore';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

/* jshint ignore:end */

/* jshint ignore:start */

if (!runningTests) {
  require("bookstore/app")["default"].create({"name":"bookstore","version":"0.0.0+9d1ff680"});
}

/* jshint ignore:end */
//# sourceMappingURL=bookstore.map
