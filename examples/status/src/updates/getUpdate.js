/* eslint consistent-return: 0 */

'use strict';

const { data } = require('@serverless/cloud'); // eslint-disable-line

const getUpdate = async (req, res, next) => {
  try {
    console.log('Getting update');
    const { incidentId, updateId } = req.params;

    const incident = await data.get(`incidents:${incidentId}`);

    if (!incident) {
      throw new Error(`IncidencId "${incidentId}" does not exist`);
    }

    const update = await data.get(`incident-${incidentId}:updates:${updateId}`);

    return res.send(update);
  } catch (e) {
    next(e);
  }
};

module.exports = getUpdate;
