/* eslint consistent-return: 0 */

'use strict';

const { data } = require('@serverless/cloud'); // eslint-disable-line

const authorize = require('../utils/authorize');
const getCollectionItems = require('../utils/getCollectionItems');

const deleteIncident = async (req, res, next) => {
  try {
    
    authorize(req);
    const { incidentId } = req.params;

    const incident = await data.get(`incidents:${incidentId}`);

    if (!incident) {
      throw new Error(`IncidencId "${incidentId}" does not exist`);
    }

    await data.remove(`incidents:${incidentId}`);

    const incidents = await getCollectionItems('incidents');

    // todo should probably delete incident updates

    return res.send({ incidents });
  } catch (e) {
    next(e);
  }
};

module.exports = deleteIncident;
