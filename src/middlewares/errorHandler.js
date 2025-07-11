const errorHandler = (err, req, res) => {
  const status = err.status || 500;
  res.status(status).json({
    message: status === 500 ? 'Server error' : err.message,
  });
};

module.exports = errorHandler;
