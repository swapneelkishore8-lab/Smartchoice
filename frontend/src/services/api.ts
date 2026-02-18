import axios from 'axios';
import { Product, ApiResponse, RecommendationRequest, RecommendationScore } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Products API
export const productsApi = {
  getAll: async (params?: Record<string, any>): Promise<ApiResponse<Product[]>> => {
    const response = await api.get('/products', { params });
    return response.data;
  },

  getById: async (id: string): Promise<ApiResponse<Product>> => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  getBySlug: async (slug: string): Promise<ApiResponse<Product>> => {
    const response = await api.get(`/products/slug/${slug}`);
    return response.data;
  },

  getFeatured: async (category: 'phone' | 'laptop'): Promise<ApiResponse<Product[]>> => {
    const response = await api.get(`/products/featured/${category}`);
    return response.data;
  },

  getBrands: async (): Promise<ApiResponse<string[]>> => {
    const response = await api.get('/products/filters/brands');
    return response.data;
  },

  compare: async (productIds: string[]): Promise<ApiResponse<Product[]>> => {
    const response = await api.post('/products/compare', { productIds });
    return response.data;
  },
};

// Search API
export const searchApi = {
  search: async (params?: Record<string, any>): Promise<ApiResponse<Product[]>> => {
    const response = await api.get('/search', { params });
    return response.data;
  },

  suggestions: async (query: string, category?: string): Promise<ApiResponse<any[]>> => {
    const response = await api.get('/search/suggestions', { params: { q: query, category } });
    return response.data;
  },

  trending: async (): Promise<ApiResponse<string[]>> => {
    const response = await api.get('/search/trending');
    return response.data;
  },
};

// Recommendations API
export const recommendationsApi = {
  getRecommendations: async (
    preferences: RecommendationRequest,
    limit?: number
  ): Promise<ApiResponse<RecommendationScore[]>> => {
    const response = await api.post('/recommendations', { preferences, limit });
    return response.data;
  },

  getQuickRecommendations: async (
    category: 'phone' | 'laptop',
    useCase: string,
    limit?: number
  ): Promise<ApiResponse<Product[]>> => {
    const response = await api.get(`/recommendations/quick/${category}/${useCase}`, {
      params: { limit },
    });
    return response.data;
  },
};

// Users API
export const usersApi = {
  register: async (data: { email: string; password: string; name: string }): Promise<any> => {
    const response = await api.post('/users/register', data);
    return response.data;
  },

  login: async (data: { email: string; password: string }): Promise<any> => {
    const response = await api.post('/users/login', data);
    return response.data;
  },

  getProfile: async (): Promise<any> => {
    const response = await api.get('/users/profile');
    return response.data;
  },

  updatePreferences: async (preferences: any): Promise<any> => {
    const response = await api.put('/users/preferences', { preferences });
    return response.data;
  },

  addToWishlist: async (productId: string): Promise<any> => {
    const response = await api.post('/users/wishlist', { productId });
    return response.data;
  },

  removeFromWishlist: async (productId: string): Promise<any> => {
    const response = await api.delete(`/users/wishlist/${productId}`);
    return response.data;
  },

  addToCompare: async (productId: string): Promise<any> => {
    const response = await api.post('/users/compare', { productId });
    return response.data;
  },

  removeFromCompare: async (productId: string): Promise<any> => {
    const response = await api.delete(`/users/compare/${productId}`);
    return response.data;
  },
};

export default api;

