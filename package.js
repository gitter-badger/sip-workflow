Package.describe({
  summary: "Sip Workflow",
  name: "sip-workflow-package",
  version: "0.0.0",
});

Package.onUse(function (api) {
  api.versionsFrom("METEOR@1.2.1");

  // taken from reaction-core to make this package work
  api.use("blaze-html-templates");
  api.use("session");
  api.use("underscore");

  // reaction core
  api.use("reactioncommerce:core@0.10.0");

  // making basic sip form work
  api.use("reactive-var");
  api.imply("reactive-var");
  api.use("zardak:soap");
  api.use("http");
  api.imply("http");
  api.use("peerlibrary:xml2js");
  api.imply("peerlibrary:xml2js");
  api.use("mizzao:user-status");
  api.use("mizzao:accounts-testing");

  api.addFiles("server/load.js", "server")
  api.addFiles("server/register.js", "server");
  api.addAssets("private/data/Products.json", "server")
  api.addAssets("private/data/Shops.json", "server")
  api.addAssets("private/data/Tags.json", "server")

  api.addFiles("sip-workflow/client/admin.html", "client")
  api.addFiles("sip-workflow/client/firstinfo.html", "client")
  api.addFiles("sip-workflow/client/nextbutton.html", "client")
  api.addFiles("sip-workflow/client/nextbutton.js", "client")
  api.addFiles("sip-workflow/client/progressBar.html", "client")
  api.addFiles("sip-workflow/client/progressBar.js", "client")
  api.addFiles("sip-workflow/client/secondinfo.html", "client")
  api.addFiles("sip-workflow/client/secondinfo.js", "client")
  api.addFiles("sip-workflow/client/sipCartCheckout.html", "client")
  api.addFiles("sip-workflow/client/sipCartCheckout.js", "client")
  api.addFiles("sip-workflow/client/template-overrides.js", "client")
  api.addFiles("sip-workflow/common/router.js", ["client", "server"])
  api.addFiles("sip-workflow/server/sipserver.js", "server")
});
