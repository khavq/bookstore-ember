import PaperToolbar from 'ember-paper/components/paper-toolbar';
import Ember from 'ember';
// export default PaperToolbar;
export default PaperToolbar.extend({
	pageTitle: "ddfgdfg",
	cart: Ember.inject.service()
});