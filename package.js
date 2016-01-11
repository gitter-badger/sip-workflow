Package.describe({
  summary: "Sip Workflow",
  name: "sip-workflow",
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

  api.addFiles("client/admin.html", "client")
  api.addFiles("client/firstinfo.html", "client")
  api.addFiles("client/firstinfo.js", "client")
  api.addFiles("client/nextbutton.html", "client")
  api.addFiles("client/nextbutton.js", "client")
  api.addFiles("client/payment.html", "client")
  api.addFiles("client/progressBar.html", "client")
  api.addFiles("client/progressBar.js", "client")
  api.addFiles("client/review.html", "client")
  api.addFiles("client/review.js", "client")
  api.addFiles("client/secondinfo.html", "client")
  api.addFiles("client/secondinfo.js", "client")
  api.addFiles("client/sipCartCheckout.html", "client")
  api.addFiles("client/sipCartCheckout.js", "client")
  api.addFiles("client/template-overrides.js", "client")
  api.addFiles("common/router.js", ["client", "server"])
  api.addFiles("server/sipserver.js", "server")
});
