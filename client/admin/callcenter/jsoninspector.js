Meteor.subscribe("userCarts")

Template.jsoninspector.helpers ({
  keys: function () {
    return Object.keys(Carts.findOne({}))
  },
  callcenterdashboard: function () {
    var userId = Meteor.userId()
    if (userId) {
      var user = Meteor.users.findOne({_id: userId})
      if (user.emails[0].verified == true) {
        return true
      }
    }
  },
})

Template.jsoninspector.created = function () {
  this.reactivevar = new ReactiveVar()
  if (Session.get("current_assisted_cart")) {
    this.reactivevar = ReactionCore.Collections.Cart.findOne({userId: Session.get("current_assisted_cart")})
  } else {
    this.reactivevar = ReactionCore.Collections.Cart.findOne()
  }
}

Template.jsoninspector.rendered = function() {
  var self = this
  Tracker.autorun(function () {
    var current_assisted_cart = self.reactivevar
      // This is the starting value for the editor
      // We will use this to seed the initial editor
      // and to provide a "Restore to Default" button.

      var starting_value = [
        ReactionCore.Collections.Cart.findOne({userId: current_assisted_cart})
      ];

      // Initialize the editor
      var editor = new JSONEditor(document.getElementById('editor_holder'),{
      theme: 'bootstrap3',
      iconlib: 'fontawesome4',
        // Enable fetching schemas via ajax
        ajax: true,

        // The schema for the editor
        schema: {
          type: "array",
          title: "Carts",
          format: "tabs",
          items: {
            title: "Cart",
            headerTemplate: "{{i}}",
            oneOf: [{
              "title": "DID/Phones Checkout Cart",
              "type": "object",
              "id": "someuniquecarttype",
              "properties": {
                "workflow": {
                  "type": "object",
        	  "description": "Checkout Workflow",
                  "properties": {
                    "status": {
                      "type": "string"
                    },
                    "workflow": {
                      "type": "array",
                    },
                  }                                
                },
                "items": {
                  "type": "array"
        	  },
                "userId": {
        	  "type": "string"
        	  },
        	},
            }, ]
          }
        },

 
        // Seed the form with a starting value
        startval: starting_value,

        // Disable additional properties
        no_additional_properties: true,

        // Require all properties by default
        required_by_default: true
      });
      


      // Hook up the submit button to log to the console
      document.getElementById('submit').addEventListener('click',function() {
        // Get the value from the editor
        console.log(editor.getValue());
      });
      
      // Hook up the Restore to Default button
      document.getElementById('restore').addEventListener('click',function() {
        editor.setValue([ReactionCore.Collections.Cart.findOne({userId: Session.get("current_assisted_cart")})]);
      });

      $(".cartstatus").click(function() {
        editor.setValue([ReactionCore.Collections.Cart.findOne({userId: this.id})])
      })

      // Hook up the enable/disable button
      document.getElementById('enable_disable').addEventListener('click',function() {
        // Enable form
        if(!editor.isEnabled()) {
          editor.enable();
        }
        // Disable form
        else {
          editor.disable();
        }
      });    

      // Hook up the validation indicator to update its
      // status whenever the editor changes
      editor.on('change',function() {
        // Get an array of errors from the validator
        var errors = editor.validate();

        var indicator = document.getElementById('valid_indicator');

        // Not valid
        if(errors.length) {
          indicator.style.color = 'red';
          indicator.textContent = "not valid";
        }
        // Valid
        else {
          indicator.style.color = 'green';
          indicator.textContent = "valid";
        }
      })
  })
}
