import Ember from 'ember';
const { computed } = Ember;

export default Ember.Controller.extend({
	queryParams: ['search'],
  	search: 'anyway',

  	filteredArticles: Ember.computed('search', 'model', function() {
	    var search = this.get('search');
	    // return category;
	    var books = this.get('model');

	    if (search) {
	      return books.filterBy('title', search);
	    } else {
	      return books;
	    }
  	})
});
