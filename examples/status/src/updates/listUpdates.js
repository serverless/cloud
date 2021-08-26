/* eslint consistent-return: 0 */

'use strict';

const { data } = require('@serverless/cloud'); // eslint-disable-line

const getCollectionItems = require('../utils/getCollectionItems');

const listUpdates = async (req, res, next) => {
  try {
    const { incidentId } = req.params;
    console.log('Listing updates');

    const incident = await data.get(`incidents:${incidentId}`);

    if (!incident) {
      throw new Error(`IncidencId "${incidentId}" does not exist`);
    }

    const updates = await getCollectionItems(`incident-${incidentId}:updates`);

    return res.send({ updates });
  } catch (e) {
    next(e);
  }
};

module.exports = listUpdates;
