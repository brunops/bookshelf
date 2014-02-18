window.HeaderView = Backbone.View.extend({
  initialize: function() {
    this.template = _.template( $('#header-template').html() );
  },

  events: {
    'click .new-btn': 'newBook'
  },

  render: function() {
    this.$el.html( this.template() );

    return this.el;
  },

  newBook: function() {
    app.navigate('books/new', true);
  }
});
