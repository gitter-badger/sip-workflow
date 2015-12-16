ReactionCore.registerPackage({
  label: 'SIP Workflow',
  name: 'sip-workflow',
  autoEnable: true,
  layout: [{
    layout: "sipcheck",
    provides: "sipWorkflow",
    collection: "Cart",
    theme: "default",
    enabled: true
  }, {
      template: "sipcheck",
      label: "Give Info",
      workflow: 'sipWorkflow',
      container: 'checkout-steps-main',
      audience: ["guest", "anonymous"],
      priority: 1,
      position: "1"
    }, {
    template: "checkoutAddressBook",
    label: "Shipping Billing",
    workflow: "sipWorkflow",
    container: "checkout-steps-main",
    audience: ["guest", "anonymous"],
    priority: 2,
    position: "2"
  }]
});
