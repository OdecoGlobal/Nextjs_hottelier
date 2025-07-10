/* eslint-disable @typescript-eslint/no-explicit-any */
interface FetchClientOptions extends RequestInit {
  authorization?: string;
  cookies?: string;
  apiKey?: string;
}

export class FetchClient {
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
