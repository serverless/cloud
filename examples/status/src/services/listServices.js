/* eslint consistent-return: 0 */

'use strict';

const { data } = require('@serverless/cloud'); // eslint-disable-line

const getCollectionItems = require('../utils/getCollectionItems');

const listServices = async (req, res, next) => {
  try {
    const serviceStatus = req.query.serviceStatus;
    

    let services;
    if (serviceStatus) {
      const { items } = await data.getByLabel('label1', serviceStatus);
      services = items.map((item) => item.value);
    } else {
      services = await getCollectionItems('services');
    }

    return res.send({ services });
  } catch (e) {
    next(e);
  }
};

module.exports = listServices;
