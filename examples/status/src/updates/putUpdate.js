/* eslint consistent-return: 0 */

'use strict';

const { data } = require('@serverless/cloud'); // eslint-disable-line
const authorize = require('../utils/authorize');
const random = require('../utils/random');
const serviceStatuses = require('../utils/serviceStatuses');
const incidentStatuses = require('../utils/incidentStatuses');

const putUpdate = async (req, res, next) => {
  try {
    console.log('Putting update');
    authorize(req);
    const { incidentId } = req.params;
    const { updateDescription, incidentStatus, affectedServicesStatus } = req.body;
    const updateId = req.body.updateId || random();

    if (!updateDescription) {
      throw new Error('Missing updateDescription');
    }

    if (!incidentStatus) {
      throw new Error('Missing incidentStatus');
    }

    if (!incidentStatuses.includes(incidentStatus)) {
      throw new Error(`Invalid incidentStatus: ${incidentStatus}`);
    }

    if (affectedServicesStatus && !serviceStatuses.includes(affectedServicesStatus)) {
      throw new Error(`Invalid affectedServicesStatus: ${affectedServicesStatus}`);
    }

    const incident = await data.get(`incidents:${incidentId}`);

    if (!incident) {
      throw new Error(`IncidencId "${incidentId}" does not exist`);
    }

    incident.incidentStatus = incidentStatus;
    incident.incidentUpdatedAt = Date.now();

    await data.set(`incidents:${incidentId}`, incident);

    for (const serviceId of incident.affectedServicesIds) {
      const service = await data.get(`services:${serviceId}`);

      service.serviceStatus = affectedServicesStatus;
      service.serviceUpdatedAt = Date.now();

      await data.set(`services:${serviceId}`, service);
    }

    const updateUpdatedAt = Date.now();

    const updateToSet = {
      updateId,
      incidentId,
      updateDescription,
      incidentStatus,
      affectedServicesStatus,
      updateUpdatedAt,
    };

    if (affectedServicesStatus) {
      updateToSet.affectedServicesStatus = affectedServicesStatus;
    }

    const existingUpdate = await data.get(`incident-${incidentId}:updates:${updateId}`);

    if (!existingUpdate) {
      updateToSet.updateCreatedAt = Date.now();
    }

    const setUpdate = await data.set(`incident-${incidentId}:updates:${updateId}`, updateToSet);

    return res.send(setUpdate);
  } catch (e) {
    next(e);
  }
};

module.exports = putUpdate;
