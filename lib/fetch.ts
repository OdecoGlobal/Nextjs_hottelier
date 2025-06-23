/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_URL } from './constants';

class FetchClient {
  private baseUrl: string;
  private defaultOptions: RequestInit;

  constructor(baseUrl: string, options: RequestInit = {}) {
    this.baseUrl = baseUrl;
    this.defaultOptions = {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    };
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = this.baseUrl + endpoint;
    const config = { ...this.defaultOptions, ...options };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw {
          status: response.status,
          message: response.statusText,
          data: errorData,
        };
      }

      return response.json();
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  }

  get(endpoint: string, options: RequestInit = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  }

  post(endpoint: string, body: any, options: RequestInit = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  patch(endpoint: string, body: any, options: RequestInit = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }
  put(endpoint: string, body: any, options: RequestInit = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  delete(endpoint: string, options: RequestInit = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  }
}

// Usage
export const fetchInstance = new FetchClient(API_URL);
