/* eslint consistent-return: 0 */

'use strict';

const { data } = require('@serverless/cloud'); // eslint-disable-line

const getCollectionItems = require('../utils/getCollectionItems');

const listIncidents = async (req, res, next) => {
  try {
    const incidentStatus = req.query.incidentStatus;

    

    let incidents;
    if (incidentStatus) {
      const { items } = await data.getByLabel('label1', incidentStatus);

      incidents = items.map((item) => item.value);
    } else {
      incidents = await getCollectionItems('incidents');
    }

    return res.send({ incidents });
  } catch (e) {
    next(e);
  }
};

module.exports = listIncidents;
