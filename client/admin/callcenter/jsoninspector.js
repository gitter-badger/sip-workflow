Template.jsoninspector.helpers({
  keys: function () {
    var userid = this._id
    return Object.keys(ReactionCore.Collections.Cart.findOne({userId: userid}))
  },
})

Template.jsoninspector.rendered = function(){
  // Initialize the editor with a JSON schema
  jsonEditor = new JSONEditor(document.getElementById('editor_holder'), {

    "theme": "bootstrap3",
    "iconlib": "fontawesome4",
    "required_by_default": true,

    "schema": {
          type: "object",
          title: "Car",
          properties: {
            make: {
              type: "string",
              enum: [
                "Toyota",
                "BMW",
                "Honda",
                "Ford",
                "Chevy",
                "VW"
              ]
            },
            model: {
              type: "string"
            },
            year: {
              type: "integer",
              enum: [
                1995,1996,1997,1998,1999,
                2000,2001,2002,2003,2004,
                2005,2006,2007,2008,2009,
                2010,2011,2012,2013,2014
              ],
              default: 2008
            }
          }
    },
  })
}
