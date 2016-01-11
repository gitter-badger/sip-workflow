/**
 * checkoutLoginCompleted
 * returns true if we've already past this stage,
 * or if the user is a guest but not anonymous
 */

Template.firstinfo.helpers({
  firstinfoCompleted: function () {
    return Session.equals("infocollectstage", 2)
  }
});
