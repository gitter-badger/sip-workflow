//
// cartCheckout is a wrapper template
// controlling the load order of checkout step templates
//
//
// If you are looking for:
//  - cartWorkflow
//  - cartWorkflowPosition
//  - cartWorkflowCompleted
// see helpers/cart.coffee
//

Template.sipCartCheckout.helpers({
  cart: function () {
    return ReactionCore.Collections.Cart.findOne();
  }
});

Template.sipCartCheckout.onRendered(function () {
  // ensure checkout drawer does not display
  Session.set("displayCartDrawer", false);
  // init cart workflow
  if (ReactionCore.Collections.Cart.findOne().workflow.status === "new") {
    // if user logged in as normal user, we must pass it through the first stage
    Meteor.call("workflow/pushCartWorkflow", "sipCartWorkflow",
      "sipCartCheckout");
  }
});
