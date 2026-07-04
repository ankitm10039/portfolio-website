// Frontend API endpoints config
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const API_ENDPOINTS = {
  contact: `${API_BASE_URL}/contact`,
};
