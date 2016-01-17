function adminUser(userId) {
  var adminUser = Meteor.users.findOne({username:"Admin"});
  return (userId && adminUser && userId === adminUser._id);
}

ReactionCore.Collections.Cart.allow({
  insert: function(userId, doc){
    return (adminUser (userId) || (userId && doc.userId === userId));
  },
  update: function (userId, docs, fields, modifier){
    for(var i=0; i<docs.length; i++ ){
      if ( docs[i].userId != userId || !adminUser(userId)) {
        return false;
      }
    }
             
    return true;
  },
  remove: function (userId, docs){
    return _.all(docs, function(doc) {
      for(var i=0; i<docs.length; i++ ){
        if ( docs[i].userId != userId || !adminUser(userId)) {
          return false;
        }
      }

      return true;
    });
  }
});

Meteor.publish("userStatus", function() {
  return Meteor.users.find({ "status.online": true });
});

Meteor.publish("userCarts", function() {
  var userId = this.userId
  if (adminUser (userId)) {
    return ReactionCore.Collections.Cart.find()
  } 
})
