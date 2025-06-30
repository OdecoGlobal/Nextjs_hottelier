/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_URL } from './constants';

interface FetchClientOptions extends RequestInit {
  authorization?: string;
  cookies?: string;
  apiKey?: string;
}

class FetchClient {
  private baseUrl: string;
  private defaultOptions: RequestInit;
  private authorization?: string;
  private cookies?: string;
  private apiKey?: string;

  constructor(baseUrl: string, options: FetchClientOptions = {}) {
    this.baseUrl = baseUrl;

    const { authorization, cookies, apiKey, ...fetchOptions } = options;
    this.authorization = authorization;
    this.cookies = cookies;
    this.apiKey = apiKey;

    this.defaultOptions = {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      ...fetchOptions,
    };
  }

  withAuth(token: string): FetchClient {
    return new FetchClient(this.baseUrl, {
      ...this.defaultOptions,
      authorization: token,
      cookies: this.cookies,
      apiKey: this.apiKey,
    });
  }

  withCookies(cookies: string): FetchClient {
    return new FetchClient(this.baseUrl, {
      ...this.defaultOptions,
      authorization: this.authorization,
      cookies,
      apiKey: this.apiKey,
    });
  }

  withApiKey(apiKey: string): FetchClient {
    return new FetchClient(this.baseUrl, {
      ...this.defaultOptions,
      authorization: this.authorization,
      cookies: this.cookies,
      apiKey,
    });
  }

  private buildHeaders(options: RequestInit = {}): Headers {
    const headers = new Headers(this.defaultOptions.headers as HeadersInit);

    if (options.headers) {
      const optionsHeaders = new Headers(options.headers as HeadersInit);
      optionsHeaders.forEach((value, key) => {
        headers.set(key, value);
      });
    }

    if (this.authorization) {
      headers.set(
        'Authorization',
        this.authorization.startsWith('Bearer ')
          ? this.authorization
          : `Bearer ${this.authorization}`,
      );
    }

    if (this.apiKey) {
      headers.set('X-API-Key', this.apiKey);
    }

    if (this.cookies) {
      headers.set('Cookie', this.cookies);
      delete (this.defaultOptions as any).credentials;
    }

    return headers;
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = this.baseUrl + endpoint;
    const headers = this.buildHeaders(options);

    const config = {
      ...this.defaultOptions,
      ...options,
      headers,
    };

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

  post(endpoint: string, body: unknown, options: RequestInit = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  patch(endpoint: string, body: unknown, options: RequestInit = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(body),
    });
  }

  put(endpoint: string, body: unknown, options: RequestInit = {}) {
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

export const fetchInstance = new FetchClient(API_URL);

export const createServerFetchInstance = (token: string) =>
  new FetchClient(API_URL).withAuth(token);

export const createServerFetchInstanceWithCookies = (cookies: string) =>
  new FetchClient(API_URL).withCookies(cookies);

export const createServerFetchInstanceWithApiKey = (apiKey: string) =>
  new FetchClient(API_URL).withApiKey(apiKey);

export const getServerFetchInstance = async (request?: Request) => {
  try {
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    const jwtToken = cookieStore.get('jwt')?.value;

    if (jwtToken) {
      return fetchInstance.withAuth(jwtToken).withCookies(`jwt=${jwtToken}`);
    }

    const allCookies = cookieStore.toString();
    if (allCookies) {
      return fetchInstance.withCookies(allCookies);
    }
  } catch {
    console.warn(
      'Next.js cookies not available, falling back to request headers',
    );
  }

  if (!request) return fetchInstance;

  const cookies = request.headers.get('cookie') || '';
  const authorization = request.headers.get('authorization');

  if (authorization) {
    return fetchInstance.withAuth(authorization).withCookies(cookies);
  }

  return fetchInstance.withCookies(cookies);
};

export const serverFetch = {
  async get(endpoint: string, options: RequestInit = {}) {
    const client = await this.getClient();
    return client.get(endpoint, options);
  },

  async post(endpoint: string, body: unknown, options: RequestInit = {}) {
    const client = await this.getClient();
    return client.post(endpoint, body, options);
  },

  async patch(endpoint: string, body: unknown, options: RequestInit = {}) {
    const client = await this.getClient();
    return client.patch(endpoint, body, options);
  },

  async put(endpoint: string, body: unknown, options: RequestInit = {}) {
    const client = await this.getClient();
    return client.put(endpoint, body, options);
  },

  async delete(endpoint: string, options: RequestInit = {}) {
    const client = await this.getClient();
    return client.delete(endpoint, options);
  },

  async getClient() {
    try {
      const { cookies } = await import('next/headers');
      const cookieStore = await cookies();
      const jwtToken = cookieStore.get('jwt')?.value;

      if (jwtToken) {
        return fetchInstance.withAuth(jwtToken).withCookies(`jwt=${jwtToken}`);
      }

      const allCookies = cookieStore.toString();
      return fetchInstance.withCookies(allCookies);
    } catch (error) {
      console.warn('Unable to access Next.js cookies:', error);
      return fetchInstance;
    }
  },
};

export const createServerFetchInstanceFromCookies = async () => {
  return serverFetch.getClient();
};
