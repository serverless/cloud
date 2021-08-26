'use strict';

const { data } = require('@serverless/cloud'); // eslint-disable-line

const getCollectionItems = async (collectionName) => {
  const { items } = await data.get(`${collectionName}:*`);
  return items.map((item) => item.value);
};

module.exports = getCollectionItems;
