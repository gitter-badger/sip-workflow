Package.describe({
  summary: "Sip Workflow",
  name: "sip-workflow-package",
  version: "0.0.0",
});

Package.onUse(function (api) {
  api.versionsFrom("METEOR@1.2.1");

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
});
