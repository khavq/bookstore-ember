import Ember from 'ember';

export default Ember.Service.extend({
	store: Ember.inject.service(),
	bookIds: [17,16],
	books: Ember.computed('bookIds.[]', function(){
		let bookIds = this.get('bookIds');
		return this.get('store').query('book', {ids: bookIds})
	}),
	add(bookId){
		this.get('bookIds').addObject(bookId);
	}
});
