window.Book = Backbone.Model.extend({
  defaults: {
    id: null,
    title: 'Unknown',
    author: 'Unknown',
    edition: 1,
    pages: 0,
    picture: ''
  },

  urlRoot: 'books'
});
