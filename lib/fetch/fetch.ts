/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_URL } from '../constants';
import { FetchClient } from './core';

// Environment detection
const isServer = typeof window === 'undefined';

async function getServerAuth(): Promise<{ token?: string; cookies?: string }> {
  if (!isServer) return {};

  try {
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    const jwtToken = cookieStore.get('jwt')?.value;

    if (jwtToken) {
      return {
        token: jwtToken,
        cookies: `jwt=${jwtToken}`,
      };
    }

    const allCookies = cookieStore.toString();
    return { cookies: allCookies };
  } catch (error) {
    console.warn('Unable to access Next.js cookies:', error);
    return {};
  }
}

class SmartFetchClient extends FetchClient {
  private async getAuthenticatedClient(): Promise<FetchClient> {
    if (isServer) {
      const { token, cookies } = await getServerAuth();

      if (token) {
        return this.withAuth(token).withCookies(cookies || '');
      }

      if (cookies) {
        return this.withCookies(cookies);
      }

      return this;
    } else {
      return this;
    }
  }

  async get(endpoint: string, options: RequestInit = {}) {
    const client = await this.getAuthenticatedClient();
    return client.get(endpoint, options);
  }

  async post(endpoint: string, body: unknown, options: RequestInit = {}) {
    const client = await this.getAuthenticatedClient();
    return client.post(endpoint, body, options);
  }

  async patch(endpoint: string, body: unknown, options: RequestInit = {}) {
    const client = await this.getAuthenticatedClient();
    return client.patch(endpoint, body, options);
  }

  async put(endpoint: string, body: unknown, options: RequestInit = {}) {
    const client = await this.getAuthenticatedClient();
    return client.put(endpoint, body, options);
  }

  async delete(endpoint: string, options: RequestInit = {}) {
    const client = await this.getAuthenticatedClient();
    return client.delete(endpoint, options);
  }
}

// Export the unified instance
export const fetchInstance = new SmartFetchClient(API_URL);

// Keep backward compatibility exports
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
