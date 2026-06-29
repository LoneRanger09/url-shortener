const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || res.statusCode || 500;

  // For certain types of Mongoose errors (e.g., CastError for a malformed ObjectId), a 404 is more appropriate.
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404;
    err.message = 'Resource not found';
  }

  // 2. Log the error for debugging purposes.
  // This helps you see what's going wrong on the server during development.
  console.error(err.stack);

  // 3. Send a structured error response to the client.
  res.status(statusCode).json({
    success: false,
    error: err.message,
     stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
};

module.exports = errorHandler;