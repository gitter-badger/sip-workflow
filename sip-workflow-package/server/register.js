ReactionCore.registerPackage({
  label: 'SIP Workflow',
  name: 'sip-workflow-package',
  autoEnable: true,
  layout: [{
    layout: "sipLayout",
    provides: "sipCartWorkflow",
    collection: "Cart",
    theme: "default",
    enabled: true
  }, {
      template: "sipCartCheckout",
      label: "Give Info",
      workflow: 'sipCartWorkflow',
      container: 'checkout-steps-main',
      audience: ["guest", "anonymous"],
      priority: 1,
      position: "1"
    }, {
    template: "checkoutAddressBook",
    label: "Receive Goodies",
    workflow: "sipCartWorkflow",
    container: "checkout-steps-main",
    audience: ["guest", "anonymous"],
    priority: 2,
    position: "2"
  }]
});
