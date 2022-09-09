const pjr = require("pactum-json-reporter");
const { reporter } = require("pactum");
exports.mochaHooks = {
  beforeAll: function () {
    reporter.add(pjr);
  },
  afterAll: function () {
    return reporter.end();
  }
};
