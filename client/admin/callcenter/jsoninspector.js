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

Template.jsoninspector.rendered = function() {
      // This is the starting value for the editor
      // We will use this to seed the initial editor
      // and to provide a "Restore to Default" button.
      var starting_value = [
        {
          name: "John Smith",
          age: 35,
          gender: "male",
          location: {
            city: "San Francisco",
            state: "California",
            citystate: ""
          },
          pets: [
            {
              name: "Spot",
              type: "dog",
              fixed: true
            },
            {
              name: "Whiskers",
              type: "cat",
              fixed: false
            }
          ]
        }
      ];
      
      // Initialize the editor
      var editor = new JSONEditor(document.getElementById('editor_holder'),{
      theme: 'foundation5',
      iconlib: 'fontawesome4',
        // Enable fetching schemas via ajax
        ajax: true,
        
        // The schema for the editor
        schema: {

          type: "array",
          title: "People",
          format: "tabs",
          items: {
            title: "Person",
	    headerTemplate: "{{i}} - {{self.name}}",
            oneOf: [
              {
  "title": "Person",
  "type": "object",
  "id": "person",
  "properties": {
    "name": {
      "type": "string",
      "description": "First and Last name",
      "minLength": 4
    },
    "age": {
      "type": "integer",
      "default": 21,
      "minimum": 18,
      "maximum": 99
    },
    "gender": {
      "type": "string",
      "enum": [
        "male",
        "female"
      ]
    }
  },

                title: "Basic Person"
              },
              {
  "title": "Person",
  "type": "object",
  "id": "person",
  "properties": {
    "name": {
      "type": "string",
      "description": "First and Last name",
      "minLength": 4
    },
    "age": {
      "type": "integer",
      "default": 21,
      "minimum": 18,
      "maximum": 99
    },
    "gender": {
      "type": "string",
      "enum": [
        "male",
        "female"
      ]
    }
  },

    "properties": {
    "location": {
      "type": "object",
      "title": "Location",
      "properties": {
        "city": {
          "type": "string"
        },
        "state": {
          "type": "string"
        },
        "citystate": {
          "type": "string",
          "description": "This is generated automatically from the previous two fields",
          "template": "{{city}}, {{state}}",
          "watch": {
            "city": "person.location.city",
            "state": "person.location.state"
          }
        }
      }
    },
    "pets": {
      "type": "array",
      "format": "table",
      "title": "Pets",
      "uniqueItems": true,
      "items": {
        "type": "object",
        "properties": {
          "type": {
            "type": "string",
            "enum": [
              "cat",
              "dog",
              "bird",
              "reptile",
              "other"
            ],
            "default": "dog"
          },
          "name": {
            "type": "string"
          },
          "fixed": {
            "type": "boolean",
            "title": "spayed / neutered"
          }
        }
      }
    }
  },
                title: "Complex Person"
              }
            ]
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
        editor.setValue(starting_value);
      });

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
          indicator.style.color = 'yellow';
          indicator.textContent = "valid";
        }
      })
}
