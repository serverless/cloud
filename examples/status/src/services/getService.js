/* eslint consistent-return: 0 */

'use strict';

const { data } = require('@serverless/cloud'); // eslint-disable-line

const getService = async (req, res, next) => {
  try {
    
    const { serviceId } = req.params;

    const service = await data.get(`services:${serviceId}`);

    return res.send(service);
  } catch (e) {
    next(e);
  }
};

module.exports = getService;
