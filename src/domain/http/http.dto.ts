export type HttpMethod = "GET";

export type HttpOptions = {
  signal?: AbortSignal | undefined;
  headers?: Record<string, string>;
  params?: Record<string, unknown>;
  queries?: Record<string, unknown>;
};
