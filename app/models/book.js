import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  price: DS.attr('number'),
  picture1: DS.attr('string'),
  author: DS.belongsTo('author', { inverse: 'books' }),
  publisher: DS.belongsTo('publisher', { polymorphic: true, inverse: 'published' }),
  updated_at: DS.attr('string'),
});
