window.AppRouter = Backbone.Router.extend({
  initialize: function() {
    this.showView('#header', new HeaderView());
  },

  routes: {
    '': 'showBooksList',
    'books/new': 'newBook',
    'books/:id': 'showBook'
  },

  showView: function(selector, view) {
    $(selector).html(view.render());

    return view;
  },

  showBooksList: function() {
    this.bookList = new BookCollection();

    var self = this;
    this.bookList.fetch({
      success: function() {
        var bookList = new BookListView({
          model: self.bookList
        });

        self.showView('#sidebar', bookList);
      }
    });
  },

  showBook: function(id) {
    var book = this.bookList.get(id);
    this.showView('#content', new BookDetailsView({
      model: book
    }));
  },

  newBook: function() {
    var book = new Book();
    this.showView('#content', new BookDetailsView({
      model: book
    }));
  }
});

var app = new AppRouter();
Backbone.history.start();
