import {BrowserOpenOptions, BrowserPrefetchOptions, PluginListenerHandle, Plugins} from "@capacitor/core";
import {Deployment} from "./Deployment";

const {Browser} = Plugins;

class Watcher {
  constructor(
    private id: string | null = null,
    public handle: PluginListenerHandle | null = null
  ) {
  };

  public remove(): void {
    if (this.handle) {
      this.handle.remove();
      this.handle = null;
    }
  }

  public reportFromBrowserListener(info: any): void {
    // @ts-ignore
    DotNet.invokeMethodAsync('BionicBridgeCapacitor', 'ReportFromBrowserListener', this.id, JSON.stringify(info));
  }
}

interface IBrowser {
  close(): Promise<void>;

  open(options: BrowserOpenOptions): Promise<void>;

  prefetch(options: BrowserPrefetchOptions): Promise<void>;

  listenToBrowserFinished(id: string): Promise<void>;

  listenToBrowserPageLoaded(id: string): Promise<void>;

  removeListener(id: string): Promise<void>;
}

export class BrowserBridge implements IBrowser {
  private static watchers = new Map<string, Watcher>();

  async close(): Promise<void> {
    if (!Browser) return Promise.reject("Browser not available.");
    return await Browser.close();
  }

  async open(options: BrowserOpenOptions): Promise<void> {
    if (!Browser) return Promise.reject("Browser not available.");
    if (await Deployment.isWeb()) {
      return void window.open(options.url, options.windowName)
    }
    return await Browser.open(options);
  }

  async prefetch(options: BrowserPrefetchOptions): Promise<void> {
    if (!Browser) return Promise.reject("Browser not available.");
    return await Browser.prefetch(options);
  }

  async listenToBrowserFinished(id: string): Promise<void> {
    if (!Browser) return Promise.reject("Browser not available.");
    if (BrowserBridge.watchers.has(id)) return Promise.reject("ID already in use.");
    try {
      const watcher = new Watcher(id);
      watcher.handle = Browser.addListener('browserFinished', watcher.reportFromBrowserListener);
      BrowserBridge.watchers.set(id, watcher);
      return new Promise<void>(resolve => resolve());
    } catch (e) {
      return new Promise<void>((r, reject) => reject(e.message));
    }
  }

  async listenToBrowserPageLoaded(id: string): Promise<void> {
    if (!Browser) return Promise.reject("Browser not available.");
    if (BrowserBridge.watchers.has(id)) return Promise.reject("ID already in use.");
    try {
      const watcher = new Watcher(id);
      watcher.handle = Browser.addListener('browserPageLoaded', watcher.reportFromBrowserListener);
      BrowserBridge.watchers.set(id, watcher);
      return new Promise<void>(resolve => resolve());
    } catch (e) {
      return new Promise<void>((r, reject) => reject(e.message));
    }
  }

  async removeListener(id: string): Promise<void> {
    try {
      const watcher = BrowserBridge.watchers.get(id);
      if (watcher && watcher.handle) {
        watcher.remove();
        BrowserBridge.watchers.delete(id);
      }
      return new Promise<void>(resolve => resolve());
    } catch (e) {
      return new Promise<void>((r, reject) => reject(e.message));
    }
  }
}
