window.BookListView = Backbone.View.extend({
  tagName: 'ul',

  initialize: function() {
    this.bind('change', this.render, this);

    this.bind('add', function(book) {
      this.$el.append( new BookListItemView({ model: book }) );
    }, this);
  },

  render: function() {
    this.$el.empty();

    _.each(this.model.models, function( book ) {
      this.$el.append( new BookListItemView({ model: book }).render() );
    }, this);

    return this.el;
  }
});
