const isDev = process.env.NODE_ENV === 'development';

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
    console.error('[ERROR]', ...args);
  },
  
  debug: (...args) => {
    if (isDev) {
      console.debug('[DEBUG]', ...args);
    }
  }
};

export default logger;