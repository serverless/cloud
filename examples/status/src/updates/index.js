/* eslint consistent-return: 0 */

'use strict';

const putUpdate = require('./putUpdate');
const getUpdate = require('./getUpdate');
const deleteUpdate = require('./deleteUpdate');
const listUpdates = require('./listUpdates');

module.exports = { putUpdate, getUpdate, deleteUpdate, listUpdates };
