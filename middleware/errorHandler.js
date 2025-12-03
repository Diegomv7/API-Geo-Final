// middleware/errorHandler.js
function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}

function errorHandler(err, req, res, next) {
  const status = err.statusCode || 500;
  const message = err.message || 'Error interno del servidor';

  res.status(status).json({
    message: message,
    stack: err.stack 
  });
}

module.exports = { logErrors, errorHandler };