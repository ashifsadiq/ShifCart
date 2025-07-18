// src/utils/http.ts
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { DEV_API_URL } from '../config/defaults';
import LocalStorage from '../Functions/asyncStorage';
import asyncStorageNames from '../config/asyncStorageNames';


const api = axios.create({
  baseURL: DEV_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 10000,
});

// Optional: Add request interceptors
api.interceptors.request.use(
  async config => {
    // Example: Add auth token if available
    const token = await LocalStorage.get(asyncStorageNames.BearerToken); // e.g. from AsyncStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
      console.log('token', JSON.stringify(token, null, 2))
    };
    return config;
  },
  error => Promise.reject(error)
);

// Generic POST request
export const apiPost = async <T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response: AxiosResponse<T> = await api.post(url, data, config);
  return response.data;
};

// Generic GET request
export const apiGet = async <T = any>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  // console.log('apiGet', { url: DEV_API_URL + url, config })
  const response: AxiosResponse<T> = await api.get(url, config);
  return response.data;
};

// Generic PUT request
export const apiPut = async <T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response: AxiosResponse<T> = await api.put(url, data, config);
  return response.data;
};

// Generic DELETE request
export const apiDelete = async <T = any>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response: AxiosResponse<T> = await api.delete(url, config);
  return response.data;
};

export default api;
