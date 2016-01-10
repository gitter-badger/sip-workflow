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

