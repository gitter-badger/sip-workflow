Meteor.subscribe("userStatus")

Template.callcenterdashboardinner.helpers({
  callcenterdashboard: function () {
    var userId = Meteor.userId()
    if (userId) {
      var user = Meteor.users.findOne({_id: userId})
      if (user.emails[0].verified == true) {
        return true
      }
    }
  },
  activecarts: function () {
    return Meteor.users.find({"status.idle": false})
  },
  idlecarts: function () {
    return Meteor.users.find({"status.idle": true})
  },
  phoneid: function () {
    return this._id
  },
})

Template.callcenterdashboardinner.events({
  'click .cartstatus': function () {
    if (!Session.equals("current_assisted_cart", this._id)) {
      Session.set("current_assisted_cart", this._id)
    }
  }
})
