const { params } = require("@serverless/cloud");

// This script demostrates loading parameters in local dev and at build time
module.exports = async function () {
  return params;
};
