import {NetworkStatus, PluginListenerHandle, Plugins} from "@capacitor/core";

const {Network} = Plugins;

class Watcher {
  id: string | null = null;
  handler: PluginListenerHandle | null = null;

  public remove(): void {
    if (this.handler) {
      this.handler.remove();
      this.handler = null;
    }
  }

  public networkListener(status: NetworkStatus): void {
    // @ts-ignore
    DotNet.invokeMethodAsync('BionicBridgeCapacitor', 'ReportNetworkStatus', this.id, status);
  }
}

interface INetwork {
  getStatus(): Promise<NetworkStatus>;

  addListener(id: string): Promise<void>;

  removeListener(id: string): Promise<void>;
}

export class NetworkBridge implements INetwork {
  private static watchers = new Map<string, Watcher>();

  async getStatus(): Promise<NetworkStatus> {
    if (!Network) return Promise.reject<NetworkStatus>("Network not available.");
    return await Network.getStatus();
  }

  async addListener(id: string): Promise<void> {
    if (!Network) return Promise.reject<void>("Network not available.");

    try {
      const watcher = new Watcher();
      watcher.id = id;
      watcher.handler = await Network.addListener("networkStatusChange", watcher.networkListener.bind(watcher));
      NetworkBridge.watchers.set(id, watcher);
      return new Promise<void>(resolve => resolve());
    } catch (e) {
      return new Promise<void>((r, reject) => reject(e.message));
    }
  }

  async removeListener(id: string): Promise<void> {
    try {
      const watcher = NetworkBridge.watchers.get(id);
      if (watcher && watcher.handler) {
        watcher.remove();
        NetworkBridge.watchers.delete(id);
      }
      return new Promise<void>(resolve => resolve());
    } catch (e) {
      return new Promise<void>((r, reject) => reject(e.message));
    }
  }
}
