import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

export default Ember.Service.extend({
	store: Ember.inject.service(),
	bookIds: storageFor('cart'),

	books: Ember.computed('bookIds.[]', function(){
		// let bookIds = this.get('bookIds');
		if (this.get('bookIds.length') == 0) {
			return [];
		} else {
			return this.get('store').query('book', {ids: this.get('bookIds.content'), cart: true})	
		}
		
	}),
	add(bookId){
		this.get('bookIds').addObject(bookId);
	},
	remove(bookId){
		this.get('bookIds').removeObject(bookId);
		// debugger
	},
	clear(){
		this.get('bookIds').clear();
	},
	bookPrices: Ember.computed.mapBy('books', 'price'),
	total: Ember.computed.sum('bookPrices'),
	centsTotal: Ember.computed('total', function(){
		return this.get('total') * 100;
	})
});
