import type { LocalStorageGateway } from "@/domain/storage/localStorage.gateway";

export class LocalStorageInfra implements LocalStorageGateway {
  private storage = localStorage;

  private parseStringToRequiredType<T>(value: string) {
    try {
      const data = JSON.parse(value);
      return data satisfies T;
    } catch {
      return value as string;
    }
  }

  recover<T>(key: string): T | null {
    const data = this.storage.getItem(key);

    if (!data) return null;

    return this.parseStringToRequiredType<T>(data);
  }

  save<T>(key: string, data: T): void {
    const value = typeof data === "string" ? data : JSON.stringify(data);
    this.storage.setItem(key, value);
  }

  delete(key: string): void {
    this.storage.removeItem(key);
  }
}
