const isDev = process.env.NODE_ENV === 'development';

/**
 * Logging utility that only logs in development mode
 * In production, only errors are logged
 */
export const logger = {
  log: (...args) => {
    if (isDev) {
      console.log('[LOG]', ...args);
    }
  },
  
  info: (...args) => {
    if (isDev) {
      console.info('[INFO]', ...args);
    }
  },
  
  warn: (...args) => {
    if (isDev) {
      console.warn('[WARN]', ...args);
    }
  },
  
  error: (...args) => {
    // Always log errors
    console.error('[ERROR]', ...args);
  },
  
  debug: (...args) => {
    if (isDev) {
      console.debug('[DEBUG]', ...args);
    }
  },
  
  group: (label) => {
    if (isDev) {
      console.group(label);
    }
  },
  
  groupEnd: () => {
    if (isDev) {
      console.groupEnd();
    }
  },
  
  table: (data) => {
    if (isDev) {
      console.table(data);
    }
  }
};

export default logger;