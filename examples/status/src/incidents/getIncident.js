/* eslint consistent-return: 0 */

'use strict';

const { data } = require('@serverless/cloud'); // eslint-disable-line

const getIncident = async (req, res, next) => {
  try {
    
    const { incidentId } = req.params;

    const incident = await data.get(`incidents:${incidentId}`);

    if (!incident) {
      throw new Error(`IncidencId "${incidentId}" does not exist`);
    }

    return res.send(incident);
  } catch (e) {
    next(e);
  }
};

module.exports = getIncident;
