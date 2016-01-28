Template.nextbutton.events({
  'click .nextbutton': function (e,t) {
    var phone = document.getElementById('phone-input').value
    Session.set("insecureusername", phone)
    var email = document.getElementById('email-input').value
    var userObj = {}
    userObj.emails = [{address: email, verified: false}]
    userObj.phones = [{phone: phone, verified: false}]
    if (email && phone) {


    Meteor.call("workflow/pushCartWorkflow", "sipCartWorkflow",
      "secondinfo");

    Meteor.call("workflow/pushCartWorkflow", "sipCartWorkflow",
      "secondinfo");


//      Meteor.insecureUserLogin(phone)
      Session.set("insecureloggedin", true)
      var userid = Meteor.userId()
    } else if (!phone || phone == '') {
      alert("Missing phone number")
    } else {
      alert("Missing email")
    }
    console.log("Form submitted.")

    Session.set("infocollectstage", 2)

    Meteor.call("sip-workflow/setBilling", cartid)

    Meteor.call("workflow/pushCartWorkflow", "sipCartWorkflow",
      "secondinfo");


  },

})

