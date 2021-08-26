'use strict';

const { params } = require('@serverless/cloud'); // eslint-disable-line

const authorize = (req) => {
  let adminPassword = req.query.adminPassword;
  const authHeader = req.get('Authorization');

  if (authHeader) {
    adminPassword = authHeader.replace('Bearer ', '');
  }

  if (!adminPassword || adminPassword !== params.ADMIN_PASSWORD) {
    throw new Error('Unauthorized');
  }
};

module.exports = authorize;
