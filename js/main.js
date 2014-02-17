Backbone.View.prototype.close = function() {
  if (this.beforeClose) {
    this.beforeClose();
  }

  this.remove();
  this.unbind();
};

window.AppRouter = Backbone.Router.extend({
  initialize: function() {
    this.showView('#header', new HeaderView());
  },

  routes: {
    '': 'showHome',
    'books/new': 'newBook',
    'books/:id': 'showBook'
  },

  showView: function(selector, view) {
    $(selector).html(view.render());

    return view;
  },

  showHome: function() {
    this.before(function() {
      this.showView('#content', new StartView());
    }, this);
  },

  before: function(callback, scope) {
    scope = scope || this;

    if (this.bookList) {
      if (callback) {
        callback.call(scope);
      }
    }
    else {
      this.bookList = new BookCollection();

      this.bookList.fetch({
        success: function() {
          var bookList = new BookListView({
            model: scope.bookList
          });

          scope.showView('#sidebar', bookList);

          if (callback) {
            callback.call(scope);
          }
        }
      });
    }
  },

  showBook: function(id) {
    this.before(function() {
      var book = this.bookList.get(id);
      this.showView('#content', new BookDetailsView({
        model: book
      }));
    }, this);
  },

  newBook: function() {
    this.before(function() {
      var book = new Book();
      this.showView('#content', new BookDetailsView({
        model: book
      }));
    }, this);
  }
});

var app = new AppRouter();
Backbone.history.start();
