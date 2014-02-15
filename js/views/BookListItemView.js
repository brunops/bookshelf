window.BookListItemView = Backbone.View.extend({
  tagName: 'li',

  initialize: function() {
    this.template = _.template( $('#book-list-item-template').html() );

    this.bind('change', this.render, this);
    this.bind('destroy', this.$el.remove, this);
  },

  render: function() {
    this.$el.html( this.template(this.model.toJSON()) );

    return this.el;
  }
});
