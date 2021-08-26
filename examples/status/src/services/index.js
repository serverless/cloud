/* eslint consistent-return: 0 */

'use strict';

const putService = require('./putService');
const getService = require('./getService');
const deleteService = require('./deleteService');
const listServices = require('./listServices');

module.exports = { putService, getService, deleteService, listServices };
