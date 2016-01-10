/**
* review status
* trigger checkoutPayment step on template checkoutReview render
*/

Template.sipCheckoutReview.onRendered(function () {
  Meteor.call("workflow/pushCartWorkflow", "sipCartWorkflow", "sipCheckoutReview");
});
