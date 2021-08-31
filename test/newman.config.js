const newman = require("newman");

newman.run(
  {
    collection: require("./specs/api/mindbridge.postman_collection.json"),
    reporters: ["cli"],
    color: "on",
    delayRequest: 1000,
    timeout: 60000,
  },

  function (err, summary) {
    if (err || summary.run.error || summary.run.failures.length) {
      process.exit(1);
    }
  }
);
