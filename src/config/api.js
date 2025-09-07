// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  TIMEOUT: 10000,
};

// App Configuration
export const APP_CONFIG = {
  TITLE: import.meta.env.VITE_APP_TITLE || 'Notes App',
  VERSION: '1.0.0',
};
