import type { HttpOptions } from "./http.dto";

export interface HttpGateway {
  get<T>(url: string, options?: HttpOptions): Promise<T>;
}
