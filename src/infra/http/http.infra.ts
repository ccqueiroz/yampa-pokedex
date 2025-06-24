import type { HttpMethod, HttpOptions } from "../../domain/http/http.dto";
import { HttpError } from "../../domain/http/http.error.entitie";
import type { HttpGateway } from "../../domain/http/http.gateway";

export class HttpInfra implements HttpGateway {
  private readonly baseUrl: string;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private buildUrl(
    path: string,
    params?: Record<string, unknown>,
    queries?: Record<string, unknown>
  ) {
    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        if (value !== undefined && value !== null) {
          path = path.replace(`:${param}`, String(value));
        }
      });
    }

    const url = new URL(path, this.baseUrl);

    if (queries) {
      Object.entries(queries).forEach(([queries, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(queries, String(value));
        }
      });
    }

    return url.toString();
  }

  private buildHeaders(headers?: Record<string, string>) {
    return {
      "Content-Type": "application/json",
      ...headers,
    };
  }

  private async request<T>(
    path: string,
    method: HttpMethod,
    options: HttpOptions = {}
  ): Promise<T> {
    const { headers, params, signal, queries } = options;
    const buildurl = this.buildUrl(path, params, queries);

    const response = await fetch(buildurl, {
      method,
      body: undefined,
      headers: this.buildHeaders(headers),
      signal,
    });

    if (response.status === 204) {
      return null as T;
    }

    const responseData = await response.json().catch(() => null);

    if (!response.ok) {
      throw new HttpError(response.status, responseData?.message);
    }

    return responseData?.data as T;
  }

  get<T>(path: string, options?: Omit<HttpOptions, "body">) {
    return this.request<T>(path, "GET", options);
  }
}
