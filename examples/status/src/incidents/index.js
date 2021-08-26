/* eslint consistent-return: 0 */

'use strict';

const putIncident = require('./putIncident');
const getIncident = require('./getIncident');
const deleteIncident = require('./deleteIncident');
const listIncidents = require('./listIncidents');

module.exports = { putIncident, getIncident, deleteIncident, listIncidents };
