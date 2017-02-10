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
define("bookstore/adapters/author", ["exports", "bookstore/adapters/application"], function (exports, _bookstoreAdaptersApplication) {
	exports["default"] = _bookstoreAdaptersApplication["default"].extend({
		shouldReloadRecord: function shouldReloadRecord() {
			console.log("shouldReloadRecord");
			return false;
		},

		shouldBackgroundReloadRecord: function shouldBackgroundReloadRecord(store, snapshot) {
			console.log("shouldBackgroundReloadRecord");
			var loadedAt = snapshot.record.get('loadedAt');

			// if it was loaded more than an hour ago
			if (Date.now() - loadedAt > 360000) {
				return true;
			} else {
				return false;
			}
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
define('bookstore/components/book-cover', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Component.extend({
		actions: {
			open: function open() {
				var _this = this;

				this.get('book').reload().then(function () {
					_this.set('isShowingModal', true);
					console.log("isShowingModal=true");
					_this.get('blurBackground')(true);
				});
			},

			close: function close() {
				this.set('isShowingModal', false);
				this.get('blurBackground')(false);
			}
		}
	});
});
define('bookstore/components/dashboard-main', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Component.extend({
		actions: {
			collapse: function collapse() {
				this.$('#instructions').collapse('toggle');
			}
		},

		didInsertElement: function didInsertElement() {
			this.$('#toggle').tooltip({ title: "Click here to toggle instructions" });
		},

		willDestroyElement: function willDestroyElement() {
			// remember to clean up your room, kids
			this.$('#toggle').tooltip('destroy');
		}
	});
});
define('bookstore/components/ember-modal-dialog-positioned-container', ['exports', 'ember-modal-dialog/components/positioned-container'], function (exports, _emberModalDialogComponentsPositionedContainer) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberModalDialogComponentsPositionedContainer['default'];
    }
  });
});
define('bookstore/components/ember-wormhole', ['exports', 'ember-wormhole/components/ember-wormhole'], function (exports, _emberWormholeComponentsEmberWormhole) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberWormholeComponentsEmberWormhole['default'];
    }
  });
});
define('bookstore/components/fa-icon', ['exports', 'ember-font-awesome/components/fa-icon'], function (exports, _emberFontAwesomeComponentsFaIcon) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberFontAwesomeComponentsFaIcon['default'];
    }
  });
});
define('bookstore/components/fa-list', ['exports', 'ember-font-awesome/components/fa-list'], function (exports, _emberFontAwesomeComponentsFaList) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberFontAwesomeComponentsFaList['default'];
    }
  });
});
define('bookstore/components/fa-stack', ['exports', 'ember-font-awesome/components/fa-stack'], function (exports, _emberFontAwesomeComponentsFaStack) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberFontAwesomeComponentsFaStack['default'];
    }
  });
});
define('bookstore/components/modal-dialog-overlay', ['exports', 'ember-modal-dialog/components/modal-dialog-overlay'], function (exports, _emberModalDialogComponentsModalDialogOverlay) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberModalDialogComponentsModalDialogOverlay['default'];
    }
  });
});
define('bookstore/components/modal-dialog', ['exports', 'ember-modal-dialog/components/modal-dialog'], function (exports, _emberModalDialogComponentsModalDialog) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberModalDialogComponentsModalDialog['default'];
    }
  });
});
define('bookstore/components/nav-bar', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({});
});
define('bookstore/components/side-bar', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({});
});
define('bookstore/components/tether-dialog', ['exports', 'ember-modal-dialog/components/tether-dialog'], function (exports, _emberModalDialogComponentsTetherDialog) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberModalDialogComponentsTetherDialog['default'];
    }
  });
});
define('bookstore/controllers/books', ['exports', 'ember'], function (exports, _ember) {
	var computed = _ember['default'].computed;
	exports['default'] = _ember['default'].Controller.extend({
		queryParams: ['limit'],
		limit: 5,

		total: computed('model.meta', function () {
			return this.get('model.meta').total;
		}),

		showAll: computed('total', 'model', function () {
			return this.get('total') > this.get('model.length');
		})
	});
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
define('bookstore/helpers/route-action', ['exports', 'ember-route-action-helper/helpers/route-action'], function (exports, _emberRouteActionHelperHelpersRouteAction) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberRouteActionHelperHelpersRouteAction['default'];
    }
  });
});
define('bookstore/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('bookstore/initializers/add-modals-container', ['exports', 'ember-modal-dialog/initializers/add-modals-container'], function (exports, _emberModalDialogInitializersAddModalsContainer) {
  exports['default'] = {
    name: 'add-modals-container',
    initialize: _emberModalDialogInitializersAddModalsContainer['default']
  };
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
define('bookstore/models/author', ['exports', 'ember-data', 'bookstore/models/publisher', 'ember-data/relationships'], function (exports, _emberData, _bookstoreModelsPublisher, _emberDataRelationships) {
	exports['default'] = _bookstoreModelsPublisher['default'].extend({
		books: _emberData['default'].hasMany('books', { async: true }),

		loadedAt: Ember.on('didLoad', function () {
			this.set('loadedAt', new Date());
		})
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
    this.route('dashboard');
  });

  exports['default'] = Router;
});
define('bookstore/routes/application', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Route.extend({
		actions: {
			blurBackground: function blurBackground(blur) {
				this.controllerFor('application').set('blur', blur);
			}
		}
	});
});
define('bookstore/routes/author', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Route.extend({
		model: function model(params) {
			return this.store.findRecord('author', params.author_id);
		}
	});
});
define('bookstore/routes/book', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Route.extend({
		queryParams: {
			limit: {
				refreshModel: true
			}
		},

		model: function model(params) {
			console.log(params);
			return this.store.query('book', params);
		},

		actions: {
			showAll: function showAll() {
				var total = this.controllerFor('books').get('total');
				this.transitionTo({ queryParams: { limit: total } });
			}
		}
	});
});
define("bookstore/routes/dashboard", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Route.extend({
    model: function model() {
      return [["1,001", "Lorem", "ipsum", "dolor", "sit"], ["1,002", "amet", "consectetur", "adipiscing", "elit"], ["1,003", "Integer", "nec", "odio", "Praesent"], ["1,003", "libero", "Sed", "cursus", "ante"], ["1,004", "dapibus", "diam", "Sed", "nisi"], ["1,005", "Nulla", "quis", "sem", "at"], ["1,006", "nibh", "elementum", "imperdiet", "Duis"], ["1,007", "sagittis", "ipsum", "Praesent", "mauris"], ["1,008", "Fusce", "nec", "tellus", "sed"], ["1,009", "augue", "semper", "porta", "Mauris"], ["1,010", "massa", "Vestibulum", "lacinia", "arcu"], ["1,011", "eget", "nulla", "Class", "aptent"], ["1,012", "taciti", "sociosqu", "ad", "litora"], ["1,013", "torquent", "per", "conubia", "nostra"], ["1,014", "per", "inceptos", "himenaeos", "Curabitur"], ["1,015", "sodales", "ligula", "in", "libero"]];
    }
  });
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
define('bookstore/services/modal-dialog', ['exports', 'ember', 'ember-modal-dialog/services/modal-dialog', 'bookstore/config/environment'], function (exports, _ember, _emberModalDialogServicesModalDialog, _bookstoreConfigEnvironment) {
  var computed = _ember['default'].computed;
  exports['default'] = _emberModalDialogServicesModalDialog['default'].extend({
    destinationElementId: computed(function () {
      /*
        everywhere except test, this property will be overwritten
        by the initializer that appends the modal container div
        to the DOM. because initializers don't run in unit/integration
        tests, this is a nice fallback.
      */
      if (_bookstoreConfigEnvironment['default'].environment === 'test') {
        return 'ember-testing';
      }
    })
  });
});
define("bookstore/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "iiMQrnWH", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[[\"helper\",[\"if\"],[[\"get\",[\"blur\"]],\"blur-background\",\"\"],null]]]],[\"flush-element\"],[\"text\",\"\\n\\t\"],[\"append\",[\"unknown\",[\"nav-bar\"]],false],[\"text\",\"\\n\\t\"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "bookstore/templates/application.hbs" } });
});
define("bookstore/templates/author", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "9QhVHAF8", "block": "{\"statements\":[[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"model\",\"name\"]],false],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"strong\",[]],[\"flush-element\"],[\"text\",\"Biography\"],[\"close-element\"],[\"text\",\": Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\\n\\n\"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\"Published titles:\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"ul\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"model\",\"books\"]]],null,0],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"  \"],[\"append\",[\"helper\",[\"book-cover\"],null,[[\"book\",\"blurBackground\"],[[\"get\",[\"book\"]],[\"helper\",[\"route-action\"],[\"blurBackground\"],null]]]],false],[\"text\",\"\\n\"]],\"locals\":[\"book\"]}],\"hasPartials\":false}", "meta": { "moduleName": "bookstore/templates/author.hbs" } });
});
define("bookstore/templates/book", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "G+alZu3l", "block": "{\"statements\":[[\"block\",[\"if\"],[[\"get\",[\"showAll\"]]],null,1],[\"open-element\",\"ul\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"model\"]]],null,0],[\"close-element\"],[\"text\",\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"    \"],[\"append\",[\"helper\",[\"book-cover\"],null,[[\"book\",\"blurBackground\"],[[\"get\",[\"book\"]],[\"helper\",[\"route-action\"],[\"blurBackground\"],null]]]],false],[\"text\",\"\\n\"]],\"locals\":[\"book\"]},{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"button\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"showAll\"]],[\"flush-element\"],[\"text\",\"Show All\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "bookstore/templates/book.hbs" } });
});
define("bookstore/templates/components/book-cover", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "tvVR3kLU", "block": "{\"statements\":[[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"book\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"open\"]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"strong\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"book\",\"title\"]],false],[\"close-element\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"em\",[]],[\"flush-element\"],[\"text\",\"by\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"block\",[\"link-to\"],[\"author\",[\"get\",[\"book\",\"author\",\"id\"]]],[[\"class\"],[\"author\"]],2],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"block\",[\"if\"],[[\"get\",[\"isShowingModal\"]]],null,1]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"modal1\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Pucharse is confirm\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\tYou want to by \"],[\"open-element\",\"strong\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"book\",\"title\"]],false],[\"close-element\"],[\"text\",\" by \"],[\"append\",[\"unknown\",[\"book\",\"author\",\"name\"]],false],[\"text\",\".\\n\\n\\t\\t\\t\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"open-element\",\"button\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"close\"]],[\"flush-element\"],[\"text\",\"Purchase for $\"],[\"append\",[\"unknown\",[\"book\",\"price\"]],false],[\"text\",\"!\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"open-element\",\"em\",[]],[\"flush-element\"],[\"text\",\"Thank you! We will email you your ebook\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"block\",[\"modal-dialog\"],null,[[\"close\",\"clickOutsideToClose\"],[\"close\",true]],0]],\"locals\":[]},{\"statements\":[[\"append\",[\"unknown\",[\"book\",\"author\",\"name\"]],false]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "bookstore/templates/components/book-cover.hbs" } });
});
define("bookstore/templates/components/dashboard-main", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "MggFpuW+", "block": "{\"statements\":[[\"open-element\",\"button\",[]],[\"static-attr\",\"id\",\"toggle\"],[\"static-attr\",\"type\",\"button\"],[\"static-attr\",\"class\",\"btn btn-default\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"collapse\"]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"glyphicon glyphicon-book\"],[\"static-attr\",\"aria-hidden\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" Instructions\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"instructions\"],[\"static-attr\",\"class\",\"panel-collapse collapse\"],[\"flush-element\"],[\"text\",\"\\n \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"well\"],[\"flush-element\"],[\"text\",\"\\n   \"],[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"Instructions\"],[\"close-element\"],[\"text\",\"\\n   \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\"],[\"close-element\"],[\"text\",\"\\n \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"h1\",[]],[\"static-attr\",\"class\",\"page-header\"],[\"flush-element\"],[\"text\",\"Dashboard\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"Articles\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"table-responsive\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"table\",[]],[\"static-attr\",\"class\",\"table table-striped\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"thead\",[]],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"tr\",[]],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\"#\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\"Header\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\"Header\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\"Header\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\"Header\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"tbody\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"articles\"]]],null,0],[\"text\",\"    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"      \"],[\"open-element\",\"tr\",[]],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"article\",\"0\"]],false],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"article\",\"1\"]],false],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"article\",\"2\"]],false],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"article\",\"3\"]],false],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"article\",\"4\"]],false],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"article\"]}],\"hasPartials\":false}", "meta": { "moduleName": "bookstore/templates/components/dashboard-main.hbs" } });
});
define('bookstore/templates/components/modal-dialog', ['exports', 'ember-modal-dialog/templates/components/modal-dialog'], function (exports, _emberModalDialogTemplatesComponentsModalDialog) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberModalDialogTemplatesComponentsModalDialog['default'];
    }
  });
});
define("bookstore/templates/components/nav-bar", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "tUqsWuyg", "block": "{\"statements\":[[\"open-element\",\"nav\",[]],[\"static-attr\",\"class\",\"navbar navbar-inverse navbar-fixed-top\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container-fluid\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"navbar-header\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"button\"],[\"static-attr\",\"class\",\"navbar-toggle collapsed\"],[\"static-attr\",\"data-toggle\",\"collapse\"],[\"static-attr\",\"data-target\",\"#navbar\"],[\"static-attr\",\"aria-expanded\",\"false\"],[\"static-attr\",\"aria-controls\",\"navbar\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"sr-only\"],[\"flush-element\"],[\"text\",\"Toggle navigation\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"icon-bar\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"icon-bar\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"icon-bar\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"block\",[\"link-to\"],[\"book\"],[[\"class\"],[\"navbar-brand\"]],1],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"navbar\"],[\"static-attr\",\"class\",\"navbar-collapse collapse\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"nav navbar-nav navbar-right\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"\\n          \"],[\"block\",[\"link-to\"],[\"dashboard\"],[[\"class\"],[\"nav-item nav-link\"]],0],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"static-attr\",\"class\",\"nav-item nav-link\"],[\"flush-element\"],[\"text\",\"Settings\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"form\",[]],[\"static-attr\",\"class\",\"navbar-form navbar-right\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"text\"],[\"static-attr\",\"class\",\"form-control\"],[\"static-attr\",\"placeholder\",\"Search...\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"Dashboard\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Awesomeproject\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "bookstore/templates/components/nav-bar.hbs" } });
});
define("bookstore/templates/components/side-bar", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "G5J1D2mb", "block": "{\"statements\":[[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"nav nav-sidebar\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"active\"],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"flush-element\"],[\"text\",\"Overview \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"sr-only\"],[\"flush-element\"],[\"text\",\"(current)\"],[\"close-element\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"flush-element\"],[\"text\",\"Reports\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"flush-element\"],[\"text\",\"Analytics\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"flush-element\"],[\"text\",\"Export\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"nav nav-sidebar\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"\"],[\"flush-element\"],[\"text\",\"Nav item\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"\"],[\"flush-element\"],[\"text\",\"Nav item again\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"\"],[\"flush-element\"],[\"text\",\"One more nav\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"\"],[\"flush-element\"],[\"text\",\"Another nav item\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"\"],[\"flush-element\"],[\"text\",\"More navigation\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"nav nav-sidebar\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"\"],[\"flush-element\"],[\"text\",\"Nav item again\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"\"],[\"flush-element\"],[\"text\",\"One more nav\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"\"],[\"flush-element\"],[\"text\",\"Another nav item\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "bookstore/templates/components/side-bar.hbs" } });
});
define('bookstore/templates/components/tether-dialog', ['exports', 'ember-modal-dialog/templates/components/tether-dialog'], function (exports, _emberModalDialogTemplatesComponentsTetherDialog) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberModalDialogTemplatesComponentsTetherDialog['default'];
    }
  });
});
define("bookstore/templates/dashboard", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "UulafNmg", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container-fluid\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-3 col-md-2 sidebar\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"append\",[\"unknown\",[\"side-bar\"]],false],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"append\",[\"helper\",[\"dashboard-main\"],null,[[\"articles\"],[[\"get\",[\"model\"]]]]],false],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "bookstore/templates/dashboard.hbs" } });
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
  require("bookstore/app")["default"].create({"name":"bookstore","version":"0.0.0+cdb718f2"});
}

/* jshint ignore:end */
//# sourceMappingURL=bookstore.map
