'use strict';

const crypto = require('crypto');

const random = () => crypto.randomBytes(5).toString('hex');

module.exports = random;
