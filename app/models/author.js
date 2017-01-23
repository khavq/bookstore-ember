import DS from 'ember-data';
import Publisher from './publisher';
import { hasMany } from 'ember-data/relationships';

export default Publisher.extend({
	books: DS.hasMany('books', { async: true }),

	loadedAt: Ember.on('didLoad', function() {
		this.set('loadedAt', new Date());
	})
});