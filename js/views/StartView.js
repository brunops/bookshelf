window.StartView = Backbone.View.extend({
  initialize: function() {
    this.template = _.template( $('#start-template').html() );
  },

  render: function() {
    this.$el.html( this.template() );

    return this.el;
  }
});
