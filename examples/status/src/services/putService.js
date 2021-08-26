/* eslint consistent-return: 0 */

'use strict';

const { data } = require('@serverless/cloud'); // eslint-disable-line
const authorize = require('../utils/authorize');
const random = require('../utils/random');
const serviceStatuses = require('../utils/serviceStatuses');

const putService = async (req, res, next) => {
  try {
    
    authorize(req);
    const { serviceName, serviceDescription, serviceStatus } = req.body;
    const serviceId = req.body.serviceId || random();

    if (!serviceName) {
      throw new Error('Missing serviceName');
    }

    if (!serviceStatus) {
      throw new Error('Missing serviceStatus');
    }

    if (!serviceStatuses.includes(serviceStatus)) {
      throw new Error(`Invalid serviceStatus: ${serviceStatus}`);
    }

    const serviceUpdatedAt = Date.now();

    const serviceToSet = { serviceId, serviceName, serviceStatus, serviceUpdatedAt };

    if (serviceDescription) {
      serviceToSet.serviceDescription = serviceDescription;
    }

    const existingService = await data.get(`services:${serviceId}`);

    if (!existingService) {
      serviceToSet.serviceCreatedAt = Date.now();
    }

    if (
      !serviceToSet.serviceDescription &&
      (!existingService || !existingService.serviceDescription)
    ) {
      serviceToSet.serviceDescription = '';
    }

    const setService = await data.set(`services:${serviceId}`, serviceToSet, {
      label1: serviceStatus,
    });

    return res.send(setService);
  } catch (e) {
    next(e);
  }
};

module.exports = putService;
