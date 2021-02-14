import {Plugins} from '@capacitor/core';

const {Storage} = Plugins;

interface IStorage {
  clear(): Promise<void>;

  get(key: string): Promise<any | null>;

  set(key: string, value: any): Promise<void>;

  keys(): Promise<string[]>;

  remove(key: string): Promise<void>;
}

export class StorageBridge implements IStorage {

  public async clear(): Promise<void> {
    if (!Storage) return Promise.reject("Storage not available.");
    try {
      return await Storage.clear();
    } catch (e) {
      return new Promise<void>((r, reject) => reject(e.message));
    }
  }

  public async get(key: string): Promise<any | null> {
    if (!Storage) return Promise.reject("Storage not available.");
    try {
      const result = await Storage.get({key});
      return new Promise<any | null>(resolve => resolve(result!==null && result.value!==null ? JSON.parse(result.value) : null));
    } catch (e) {
      return new Promise<any | null>((r, reject) => reject(e.message));
    }
  }

  public async set(key: string, value: any): Promise<void> {
    if (!Storage) return Promise.reject("Storage not available.");
    try {
      return await Storage.set({key, value: JSON.stringify(value)});
    } catch (e) {
      return new Promise<void>((r, reject) => reject(e.message));
    }
  }

  public async keys(): Promise<string[]> {
    if (!Storage) return Promise.reject("Storage not available.");
    try {
      const result = await Storage.keys();
      return new Promise<string[]>(resolve => resolve(result && !!result.keys ? result.keys : []));
    } catch (e) {
      return new Promise<string[]>((r, reject) => reject(e.message));
    }
  }

  public async remove(key: string): Promise<void> {
    if (!Storage) return Promise.reject("Storage not available.");
    try {
      return await Storage.remove({key});
    } catch (e) {
      return new Promise<void>((r, reject) => reject(e.message));
    }
  }
}
