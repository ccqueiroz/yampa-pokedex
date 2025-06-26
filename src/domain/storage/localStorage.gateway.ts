export interface LocalStorageGateway {
  recover<T>(key: string): T | null;
  save<T>(key: string, data: T): void;
  delete(key: string): void;
}
