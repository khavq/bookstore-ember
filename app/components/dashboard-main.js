import Ember from 'ember';

export default Ember.Component.extend({
	actions: {
	    collapse() {
	      this.$('#instructions').collapse('toggle');
	    }
	  },

	  didInsertElement() {
	    // this.$('#toggle').tooltip({ title: "Click here to toggle instructions" });
	  },

	  willDestroyElement() {
	    // remember to clean up your room, kids
	    // this.$('#toggle').tooltip('destroy');
	  }
});
