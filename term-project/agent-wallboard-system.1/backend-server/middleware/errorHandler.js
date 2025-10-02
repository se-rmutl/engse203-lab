const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);
  
  // Default error
  let error = {
    success: false,
    error: 'Internal server error'
  };
  
  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    error.error = message;
    return res.status(400).json(error);
  }
  
  // Mongoose duplicate key error
  if (err.code === 11000) {
    error.error = 'Duplicate field value entered';
    return res.status(400).json(error);
  }
  
  // JWT error
  if (err.name === 'JsonWebTokenError') {
    error.error = 'Invalid token';
    return res.status(401).json(error);
  }
  
  res.status(500).json(error);
};

module.exports = errorHandler;