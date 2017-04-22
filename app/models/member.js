import DS from 'ember-data';

export default DS.Model.extend({
  email: DS.attr('string'),
  full_name: DS.attr('string'),
  avatar_url: DS.attr('string')
});
