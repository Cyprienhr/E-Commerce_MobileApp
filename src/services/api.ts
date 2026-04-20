import axios from 'axios';
import { API_BASE_URL } from '../constants';
import { Product, User, Cart } from '../types';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const productService = {
  getAllProducts: async (): Promise<Product[]> => {
    const response = await api.get('/products');
    return response.data;
  },

  getProductById: async (id: number): Promise<Product> => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  getProductsByCategory: async (category: string): Promise<Product[]> => {
    const response = await api.get(`/products/category/${category}`);
    return response.data;
  },

  getCategories: async (): Promise<string[]> => {
    const response = await api.get('/products/categories');
    return response.data;
  },
};

export const userService = {
  getAllUsers: async (): Promise<User[]> => {
    const response = await api.get('/users');
    return response.data;
  },

  getUserById: async (id: number): Promise<User> => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  loginUser: async (username: string, password: string) => {
    const response = await api.post('/auth/login', {
      username,
      password,
    });
    return response.data;
  },
};

export const cartService = {
  getUserCart: async (userId: number): Promise<Cart> => {
    const response = await api.get(`/carts/user/${userId}`);
    return response.data;
  },

  addToCart: async (userId: number, productId: number, quantity: number) => {
    const response = await api.post('/carts', {
      userId,
      date: new Date().toISOString(),
      products: [
        {
          productId,
          quantity,
        },
      ],
    });
    return response.data;
  },

  updateCart: async (cartId: number, products: { productId: number; quantity: number }[]) => {
    const response = await api.put(`/carts/${cartId}`, {
      products,
    });
    return response.data;
  },

  deleteCart: async (cartId: number) => {
    const response = await api.delete(`/carts/${cartId}`);
    return response.data;
  },
};

export default api;
