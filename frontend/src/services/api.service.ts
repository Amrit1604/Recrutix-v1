import axios, { AxiosInstance, AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { ApiResponse, ErrorResponse } from '../types/api.types';

/**
 * Base API service with axios instance
 * Handles all HTTP requests to the FastAPI backend
 */
class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor
    this.api.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // Add any auth tokens here if needed
        return config;
      },
      (error: any) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError<ErrorResponse>) => {
        const customError = {
          message: error.response?.data?.error || error.message || 'An error occurred',
          statusCode: error.response?.status || 500,
          detail: error.response?.data?.detail,
        };
        return Promise.reject(customError);
      }
    );
  }

  /**
   * GET request
   */
  async get<T>(url: string, params?: any): Promise<ApiResponse<T>> {
    const response = await this.api.get<ApiResponse<T>>(url, { params });
    return response.data;
  }

  /**
   * POST request
   */
  async post<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    const response = await this.api.post<ApiResponse<T>>(url, data);
    return response.data;
  }

  /**
   * PUT request
   */
  async put<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    const response = await this.api.put<ApiResponse<T>>(url, data);
    return response.data;
  }

  /**
   * DELETE request
   */
  async delete<T>(url: string): Promise<ApiResponse<T>> {
    const response = await this.api.delete<ApiResponse<T>>(url);
    return response.data;
  }

  /**
   * Upload file with FormData
   */
  async uploadFile<T>(url: string, formData: FormData): Promise<ApiResponse<T>> {
    const response = await this.api.post<ApiResponse<T>>(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
}

export default new ApiService();
