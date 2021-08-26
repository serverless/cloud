'use strict';

// eslint-disable-next-line
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (!err.statusCode) {
    err.statusCode = 500;
  }

  const error = {
    name: err.name,
    statusCode: err.statusCode,
    message: err.message,
  };

  return res.status(err.statusCode).json(error);
};

module.exports = errorHandler;
