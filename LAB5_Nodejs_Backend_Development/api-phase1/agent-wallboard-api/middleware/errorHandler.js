// middleware/errorHandler.js - Professional error handling
const { sendError } = require('../utils/apiResponse');

const globalErrorHandler = (err, req, res, next) => {
  console.error('🚨 Global Error Handler:', {
    error: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    url: req.originalUrl,
    method: req.method
  });

  // Joi validation errors
  if (err.isJoi) {
    const validationErrors = err.details.map(detail => ({
      field: detail.path[0],
      message: detail.message
    }));
    return sendError(res, 'Validation failed', 400, validationErrors);
  }

  // Default server error
  const message = process.env.NODE_ENV === 'production' 
    ? 'Internal server error' 
    : err.message;
    
  return sendError(res, message, 500);
};

const notFoundHandler = (req, res) => {
  console.log(`🔍 404 Not Found: ${req.method} ${req.originalUrl}`);
  return sendError(res, `Route ${req.originalUrl} not found`, 404);
};

// Performance monitoring middleware
const performanceMonitor = (req, res, next) => {
  const startTime = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    
    if (duration > 1000) {
      console.warn(`🐌 Slow request: ${req.method} ${req.url} took ${duration}ms`);
    }
    
    console.log(`⚡ ${req.method} ${req.url}: ${duration}ms - ${res.statusCode}`);
  });
  
  next();
};

module.exports = { globalErrorHandler, notFoundHandler, performanceMonitor };