import {AppRestoredResult, AppState, AppUrlOpen, PluginListenerHandle, Plugins} from "@capacitor/core";

const {App} = Plugins;

class Watcher {
  id: string | null = null;
  handler: PluginListenerHandle | null = null;

  public remove(): void {
    if (this.handler) {
      this.handler.remove();
      this.handler = null;
    }
  }

  public appStateChangeListener(state: AppState): void {
    // @ts-ignore
    DotNet.invokeMethodAsync('BionicBridgeCapacitor', 'ReportAppStateChange', this.id, state);
  }

  public appUrlOpenListener(data: AppUrlOpen): void {
    // @ts-ignore
    DotNet.invokeMethodAsync('BionicBridgeCapacitor', 'ReportAppUrlOpen', this.id, data);
  }

  public appRestoredResultListener(data: AppRestoredResult): void {
    // @ts-ignore
    DotNet.invokeMethodAsync('BionicBridgeCapacitor', 'ReportAppRestoredResult', this.id, data);
  }

  public backButtonListener(data: AppUrlOpen): void {
    // @ts-ignore
    DotNet.invokeMethodAsync('BionicBridgeCapacitor', 'ReportBackButton', this.id, data);
  }
}

interface IApp {
  canOpenUrl(url: string): Promise<boolean>;

  exitApp(): Promise<void>;

  getLaunchUrl(): Promise<string | null>;

  openUrl(url: string): Promise<boolean>;

  addAppStateChangeListener(id: string): Promise<void>;

  addAppUrlOpenListener(id: string): Promise<void>;

  addAppRestoredResultListener(id: string): Promise<void>;

  addBackButtonListener(id: string): Promise<void>;

  removeListener(id: string): Promise<void>;
}

export class AppBridge implements IApp {
  private static watchers = new Map<string, Watcher>();

  async canOpenUrl(url: string): Promise<boolean> {
    if (!App) return Promise.reject("App not available.");
    const result = await App.canOpenUrl({url});
    return result ? result.value : false;
  }

  async exitApp(): Promise<void> {
    if (!App) return Promise.reject("App not available.");
    await App.exitApp();
  }

  async getLaunchUrl(): Promise<string | null> {
    if (!App) return Promise.reject("App not available.");
    const result = await App.getLaunchUrl();
    return result && result.url ? result.url : null;
  }

  async openUrl(url: string): Promise<boolean> {
    if (!App) return Promise.reject("App not available.");
    const result = await App.openUrl({url});
    return result ? result.completed : false;
  }

  async addAppStateChangeListener(id: string): Promise<void> {
    if (!App) return Promise.reject<void>("App not available.");

    try {
      const watcher = new Watcher();
      watcher.id = id;
      watcher.handler = await App.addListener("appStateChange", watcher.appStateChangeListener.bind(watcher));
      AppBridge.watchers.set(id, watcher);
      return new Promise<void>(resolve => resolve());
    } catch (e) {
      return new Promise<void>((r, reject) => reject(e.message));
    }
  }

  async addAppUrlOpenListener(id: string): Promise<void> {
    if (!App) return Promise.reject<void>("App not available.");

    try {
      const watcher = new Watcher();
      watcher.id = id;
      watcher.handler = await App.addListener("appUrlOpen", watcher.appUrlOpenListener.bind(watcher));
      AppBridge.watchers.set(id, watcher);
      return new Promise<void>(resolve => resolve());
    } catch (e) {
      return new Promise<void>((r, reject) => reject(e.message));
    }
  }

  async addAppRestoredResultListener(id: string): Promise<void> {
    if (!App) return Promise.reject<void>("App not available.");

    try {
      const watcher = new Watcher();
      watcher.id = id;
      watcher.handler = await App.addListener("appRestoredResult", watcher.appRestoredResultListener.bind(watcher));
      AppBridge.watchers.set(id, watcher);
      return new Promise<void>(resolve => resolve());
    } catch (e) {
      return new Promise<void>((r, reject) => reject(e.message));
    }
  }

  async addBackButtonListener(id: string): Promise<void> {
    if (!App) return Promise.reject<void>("App not available.");

    try {
      const watcher = new Watcher();
      watcher.id = id;
      watcher.handler = await App.addListener("backButton", watcher.backButtonListener.bind(watcher));
      AppBridge.watchers.set(id, watcher);
      return new Promise<void>(resolve => resolve());
    } catch (e) {
      return new Promise<void>((r, reject) => reject(e.message));
    }
  }

  async removeListener(id: string): Promise<void> {
    try {
      const watcher = AppBridge.watchers.get(id);
      if (watcher && watcher.handler) {
        watcher.remove();
        AppBridge.watchers.delete(id);
      }
      return new Promise<void>(resolve => resolve());
    } catch (e) {
      return new Promise<void>((r, reject) => reject(e.message));
    }
  }
}
