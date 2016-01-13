Meteor.subscribe("userStatus")

Template.callcenterdashboard.helpers({
  callcenterdashboard: function () {
    var userId = Meteor.userId()
    if (userId) {
      var user = Meteor.users.findOne({_id: userId})
      if (user.emails[0].verified == true) {
        return true
      }
    }
  },
  activeusers: function () {
    return Meteor.users.find({"status.idle": false})
  },
  idleusers: function () {
    return Meteor.users.find({"status.idle": true})
  },
  phoneid: function () {
    return this._id
  },
})
