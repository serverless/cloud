/* eslint consistent-return: 0 */

'use strict';

const authorize = require('./authorize');

const validatePassword = async (req, res, next) => {
  try {
    console.log('Validating password');
    authorize(req);
    return res.send({});
  } catch (e) {
    next(e);
  }
};

module.exports = validatePassword;
