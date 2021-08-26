'use strict';

const { api } = require('@serverless/cloud'); // eslint-disable-line

const errorHandler = require('./errors/errorHandler');
const validatePassword = require('./utils/validatePassword');

const { putService, getService, deleteService, listServices } = require('./services');
const { putIncident, getIncident, deleteIncident, listIncidents } = require('./incidents');
const { putUpdate, getUpdate, deleteUpdate, listUpdates } = require('./updates');

// Validate Password
api.get('/api/auth', validatePassword);

// Services
api.put('/api/services', putService);
api.get('/api/services/:serviceId', getService);
api.delete('/api/services/:serviceId', deleteService);
api.get('/api/services', listServices);

// Incidents
api.put('/api/incidents', putIncident);
api.get('/api/incidents/:incidentId', getIncident);
api.delete('/api/incidents/:incidentId', deleteIncident);
api.get('/api/incidents', listIncidents);

// Updates
api.put('/api/incidents/:incidentId/updates', putUpdate);
api.get('/api/incidents/:incidentId/updates/:updateId', getUpdate);
api.delete('/api/incidents/:incidentId/updates/:updateId', deleteUpdate);
api.get('/api/incidents/:incidentId/updates', listUpdates);

api.get('/incidents/*', (req, res) => {
  res.redirect('/');
});

api.get('/admin/*', (req, res) => {
  res.redirect('/');
});

api.use(errorHandler);

module.exports = api;
