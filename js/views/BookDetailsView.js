window.BookDetailsView = Backbone.View.extend({
  initialize: function() {
    this.template = _.template( $('#book-details-template').html() );

    this.model.bind('change', this.render, this);
  },

  render: function() {
    this.$el.empty();

    this.$el.html( this.template(this.model.toJSON()) );

    return this.el;
  },

  events: {
    'click .save': 'saveBook',
    'click .delete': 'deleteBook'
  },

  saveBook: function() {
    this.model.set({
      title: $('#title').val(),
      author: $('#author').val(),
      edition: $('#edition').val(),
      pages: $('#pages').val(),
      picture: $('#picture').val()
    });

    if (this.model.isNew()) {
      app.bookList.create(this.model, {
        success: function() {
          app.navigate('books/' + this.model.get('id'));
        }
      });
    }
    else {
      this.model.save();
    }

    return false;
  },

  deleteBook: function() {
    this.model.destroy({
      success: function() {
        alert('Book deleted successfully!');
        window.history.back();
      }
    });

    return false;
  }
});
