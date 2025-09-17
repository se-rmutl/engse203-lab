// middleware/validation.js - Enhanced validation with message validation
const Joi = require('joi');
const { AGENT_STATUS, DEPARTMENTS } = require('../utils/constants');
const { sendError } = require('../utils/apiResponse');

// Validation schemas
const schemas = {
  // Agent validation (existing)
  agent: Joi.object({
    agentCode: Joi.string()
      .pattern(/^[A-Z]\d{3}$/)
      .required()
      .messages({
        'string.pattern.base': 'Agent code must be in format A001 (letter + 3 digits)',
        'any.required': 'Agent code is required'
      }),
    
    name: Joi.string()
      .min(2)
      .max(100)
      .required()
      .messages({
        'string.min': 'Name must be at least 2 characters',
        'string.max': 'Name cannot exceed 100 characters',
        'any.required': 'Name is required'
      }),
    
    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.email': 'Please provide a valid email address',
        'any.required': 'Email is required'
      }),
    
    department: Joi.string()
      .valid(...DEPARTMENTS)
      .default('General')
      .messages({
        'any.only': `Department must be one of: ${DEPARTMENTS.join(', ')}`
      }),
    
    skills: Joi.array()
      .items(Joi.string().min(2).max(50))
      .default([])
      .messages({
        'array.base': 'Skills must be an array of strings'
      })
  }),

  // Status update validation (existing)
  statusUpdate: Joi.object({
    status: Joi.string()
      .valid(...Object.values(AGENT_STATUS))
      .required()
      .messages({
        'any.only': `Status must be one of: ${Object.values(AGENT_STATUS).join(', ')}`,
        'any.required': 'Status is required'
      }),
    
    reason: Joi.string()
      .max(200)
      .optional()
      .messages({
        'string.max': 'Reason cannot exceed 200 characters'
      })
  }),

  // Message validation (ใหม่)
  message: Joi.object({
    from: Joi.string()
      .min(2)
      .max(100)
      .required()
      .messages({
        'string.min': 'From must be at least 2 characters',
        'string.max': 'From cannot exceed 100 characters',
        'any.required': 'From is required'
      }),
    
    to: Joi.string()
      .min(1)
      .max(100)
      .required()
      .messages({
        'string.min': 'To must be at least 1 character',
        'string.max': 'To cannot exceed 100 characters',
        'any.required': 'To is required'
      }),
    
    message: Joi.string()
      .min(1)
      .max(1000)
      .required()
      .messages({
        'string.min': 'Message cannot be empty',
        'string.max': 'Message cannot exceed 1000 characters',
        'any.required': 'Message is required'
      }),
    
    type: Joi.string()
      .valid('message', 'broadcast', 'alert', 'system')
      .default('message')
      .messages({
        'any.only': 'Type must be one of: message, broadcast, alert, system'
      }),
    
    priority: Joi.string()
      .valid('low', 'normal', 'high', 'urgent')
      .default('normal')
      .messages({
        'any.only': 'Priority must be one of: low, normal, high, urgent'
      })
  })
};

// Validation middleware functions
const validateAgent = (req, res, next) => {
  const { error, value } = schemas.agent.validate(req.body, {
    abortEarly: false,
    stripUnknown: true
  });

  if (error) {
    const validationErrors = error.details.map(detail => ({
      field: detail.path[0],
      message: detail.message
    }));

    console.log('⚠️ Agent validation failed:', validationErrors);
    return sendError(res, 'Validation failed', 400, validationErrors);
  }

  req.body = value;
  next();
};

const validateStatusUpdate = (req, res, next) => {
  const { error, value } = schemas.statusUpdate.validate(req.body, {
    abortEarly: false,
    stripUnknown: true
  });

  if (error) {
    const validationErrors = error.details.map(detail => ({
      field: detail.path[0],
      message: detail.message
    }));

    console.log('⚠️ Status validation failed:', validationErrors);
    return sendError(res, 'Status validation failed', 400, validationErrors);
  }

  req.body = value;
  next();
};

// Message validation (ใหม่)
const validateMessage = (req, res, next) => {
  const { error, value } = schemas.message.validate(req.body, {
    abortEarly: false,
    stripUnknown: true
  });

  if (error) {
    const validationErrors = error.details.map(detail => ({
      field: detail.path[0],
      message: detail.message
    }));

    console.log('⚠️ Message validation failed:', validationErrors);
    return sendError(res, 'Message validation failed', 400, validationErrors);
  }

  req.body = value;
  next();
};

module.exports = {
  validateAgent,
  validateStatusUpdate,
  validateMessage
};