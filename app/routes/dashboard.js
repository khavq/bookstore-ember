import Ember from 'ember';

export default Ember.Route.extend({
	model() {
    return [
      ["1,001", "Lorem", "ipsum", "dolor", "sit"],
      ["1,002", "amet", "consectetur", "adipiscing", "elit"],
      ["1,003", "Integer", "nec", "odio", "Praesent"],
      ["1,003", "libero", "Sed", "cursus", "ante"],
      ["1,004", "dapibus", "diam", "Sed", "nisi"],
      ["1,005", "Nulla", "quis", "sem", "at"],
      ["1,006", "nibh", "elementum", "imperdiet", "Duis"],
      ["1,007", "sagittis", "ipsum", "Praesent", "mauris"],
      ["1,008", "Fusce", "nec", "tellus", "sed"],
      ["1,009", "augue", "semper", "porta", "Mauris"],
      ["1,010", "massa", "Vestibulum", "lacinia", "arcu"],
      ["1,011", "eget", "nulla", "Class", "aptent"],
      ["1,012", "taciti", "sociosqu", "ad", "litora"],
      ["1,013", "torquent", "per", "conubia", "nostra"],
      ["1,014", "per", "inceptos", "himenaeos", "Curabitur"],
      ["1,015", "sodales", "ligula", "in", "libero"]
    ];
  }
});
