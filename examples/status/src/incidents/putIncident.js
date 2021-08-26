/* eslint consistent-return: 0 */

'use strict';

const { data } = require('@serverless/cloud'); // eslint-disable-line
const authorize = require('../utils/authorize');
const random = require('../utils/random');
const incidentStatuses = require('../utils/incidentStatuses');

const putIncident = async (req, res, next) => {
  try {
    
    authorize(req);
    const { incidentName, incidentDescription, affectedServicesIds, incidentStatus } = req.body;
    const incidentId = req.body.incidentId || random();

    if (!incidentName) {
      throw new Error('Missing incidentName');
    }

    if (!incidentStatus) {
      throw new Error('Missing incidentStatus');
    }

    if (!incidentStatuses.includes(incidentStatus)) {
      throw new Error(`Invalid incidentStatus: ${incidentStatus}`);
    }

    if (!affectedServicesIds || affectedServicesIds.length === 0) {
      throw new Error('Missing affectedServicesIds');
    }

    for (const serviceId of affectedServicesIds) {
      const service = await data.get(`services:${serviceId}`);

      if (!service) {
        throw new Error(`serviceId "${serviceId}" does not exist`);
      }
    }

    const incidentUpdatedAt = Date.now();

    const incidentToSet = {
      incidentId,
      incidentName,
      incidentStatus,
      affectedServicesIds,
      incidentUpdatedAt,
    };

    if (incidentDescription) {
      incidentToSet.incidentDescription = incidentDescription;
    }

    const existingIncident = await data.get(`incidents:${incidentId}`);

    if (!existingIncident) {
      incidentToSet.incidentCreatedAt = Date.now();
    }

    if (
      !incidentToSet.incidentDescription &&
      (!existingIncident || !existingIncident.incidentDescription)
    ) {
      incidentToSet.incidentDescription = '';
    }

    const setIncident = await data.set(`incidents:${incidentId}`, incidentToSet, {
      label1: incidentStatus,
    });

    return res.send(setIncident);
  } catch (e) {
    next(e);
  }
};

module.exports = putIncident;
