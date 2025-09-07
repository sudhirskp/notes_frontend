import axios from 'axios';
import { API_CONFIG } from '../config/api';
import { STORAGE_KEYS } from '../constants';

const API_BASE_URL = API_CONFIG.BASE_URL;

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Debug logging
    console.log('Making API request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      baseURL: config.baseURL,
      fullURL: `${config.baseURL}${config.url}`,
      headers: config.headers,
      data: config.data
    });
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
apiClient.interceptors.response.use(
  (response) => {
    console.log('API response received:', {
      status: response.status,
      url: response.config.url,
      data: response.data
    });
    return response;
  },
  (error) => {
    console.error('API error:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      url: error.config?.url,
      method: error.config?.method?.toUpperCase(),
      data: error.response?.data,
      message: error.message
    });
    
    if (error.response?.status === 401) {
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER);
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API functions
export const authAPI = {
  register: async (username, password) => {
    const response = await apiClient.post('/auth/register', {
      username,
      password,
    });
    return response.data;
  },

  login: async (username, password) => {
    const response = await apiClient.post('/auth/login', {
      username,
      password,
    });
    return response.data;
  },
};

// Notes API functions
export const notesAPI = {
  getAll: async () => {
    const response = await apiClient.get('/notes');
    return response.data;
  },

  getById: async (id) => {
    const response = await apiClient.get(`/notes/${id}`);
    return response.data;
  },

  create: async (title, content) => {
    const response = await apiClient.post('/notes', {
      title,
      content,
    });
    return response.data;
  },

  update: async (id, title, content) => {
    const response = await apiClient.put(`/notes/${id}`, {
      title,
      content,
    });
    return response.data;
  },

  delete: async (id) => {
    await apiClient.delete(`/notes/${id}`);
  },
};

export default apiClient;
