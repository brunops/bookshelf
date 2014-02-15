window.AppRouter = Backbone.Router.extend({
  initialize: function() {
    this.showView('#header', new HeaderView());
  },

  routes: {
    '': 'bookList'
  },

  showView: function(selector, view) {
    $(selector).html(view.render());

    return view;
  },

  bookList: function() {
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

  }
});

var app = new AppRouter();
Backbone.history.start();
