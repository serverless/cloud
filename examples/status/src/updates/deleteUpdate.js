/* eslint consistent-return: 0 */

'use strict';

const { data } = require('@serverless/cloud'); // eslint-disable-line

const authorize = require('../utils/authorize');
const getCollectionItems = require('../utils/getCollectionItems');

const deleteUpdate = async (req, res, next) => {
  try {
    console.log('Deleting update');
    authorize(req);
    const { incidentId, updateId } = req.params;

    const incident = await data.get(`incidents:${incidentId}`);

    if (!incident) {
      throw new Error(`IncidencId "${incidentId}" does not exist`);
    }

    await data.remove(`incident-${incidentId}:updates:${updateId}`);

    const updates = await getCollectionItems(`incident-${incidentId}:updates`);

    return res.send({ updates });
  } catch (e) {
    next(e);
  }
};

module.exports = deleteUpdate;
