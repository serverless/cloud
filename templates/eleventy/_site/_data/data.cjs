const { data } = require("@serverless/cloud");

// This script demostrates querying in local dev and at build time
module.exports = async function () {
  let results = await data.get("user:*");
  return results.items.length > 0 ? results.items : [];
};
