/* eslint consistent-return: 0 */

'use strict';

const { data } = require('@serverless/cloud'); // eslint-disable-line

const authorize = require('../utils/authorize');
const getCollectionItems = require('../utils/getCollectionItems');

const deleteService = async (req, res, next) => {
  try {
    
    authorize(req);
    const { serviceId } = req.params;

    await data.remove(`services:${serviceId}`);

    const services = await getCollectionItems('services');

    return res.send({ services });
  } catch (e) {
    next(e);
  }
};

module.exports = deleteService;
