window.Book = Backbone.Model.extend({
  initialize: function() {
    id: null,
    title: 'Unknown',
    author: 'Unknown',
    edition: 1,
    pages: 0,
    picture: ''
  },

  urlRoot: 'books/'
});
