ReactionCore.registerPackage({
  label: 'SIP Workflow',
  name: 'sip-workflow-package',
  autoEnable: true,
  layout: [{
    layout: "coreLayout",
    provides: "sipCartWorkflow",
    collection: "Cart",
    theme: "default",
    enabled: true
  }, {
      template: "firstinfo",
      label: "Give Info",
      workflow: 'sipCartWorkflow',
      container: 'checkout-steps-main',
      audience: ["guest", "anonymous"],
      priority: 1,
      position: "1"
    }, {
    template: "secondinfo",
    label: "Receive Goodies",
    workflow: "sipCartWorkflow",
    container: "checkout-steps-side",
    audience: ["guest", "anonymous"],
    priority: 2,
    position: "2"
  }]
});
