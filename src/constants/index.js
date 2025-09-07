// App Constants

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
};

export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
};

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
  },
  NOTES: {
    BASE: '/notes',
    BY_ID: (id) => `/notes/${id}`,
  },
};

export const VALIDATION_RULES = {
  USERNAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 50,
  },
  PASSWORD: {
    MIN_LENGTH: 6,
  },
  NOTE_TITLE: {
    MAX_LENGTH: 100,
  },
};

export const TOAST_DURATION = {
  SUCCESS: 3000,
  ERROR: 5000,
  DEFAULT: 4000,
};

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
};

export const SEARCH = {
  DEBOUNCE_DELAY: 300,
};
