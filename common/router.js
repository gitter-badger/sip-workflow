/*
 * General Route Declarations
 */

Router.map(function () {
  this.route("sipcheckout", {
    layoutTemplate: "sipCartCheckout",
    path: "sipcheckout",
    template: "sipCartCheckout",
    yieldTemplates: {
      checkoutHeader: {
        to: "layoutHeader"
      }
    },
/*
    waitOn: function () {
      this.subscribe("Packages");
      this.subscribe("Products");
      this.subscribe("Shipping");
      return this.subscribe("AccountOrders");
    }
*/
  });

/*
  this.route("sipCartCompleted", {
    controller: ShopController,
    path: "sipcompleted/:_id",
    template: "cartCompleted",
    subscriptions: function () {
      this.subscribe("Orders");
      return this.subscribe("CompletedCartOrder", Meteor.userId(),
        this.params._id);
    },
    data: function () {
      if (this.ready()) {
        if (ReactionCore.Collections.Orders.findOne({
          cartId: this.params._id
        })) {
          return ReactionCore.Collections.Orders.findOne({
            cartId: this.params._id
          });
        }
        return this.render("unauthorized");
      }
      return this.render("loading");
    }
  });
*/
});
