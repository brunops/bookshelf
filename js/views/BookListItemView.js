window.BookListItemView = Backbone.View.extend({
  tagName: 'li',

  initialize: function() {
    this.template = _.template( $('#book-list-item-template').html() );

    this.model.bind('change', this.render, this);
    this.model.bind('remove', function() { this.$el.remove(); }, this);
  },

  render: function() {
    this.$el.html( this.template(this.model.toJSON()) );

    return this.el;
  }
});
