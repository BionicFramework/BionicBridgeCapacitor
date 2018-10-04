import {CallbackID, GeolocationPosition, Plugins, ToastShowOptions} from "@capacitor/core";

const {BackgroundTask} = Plugins;

class Watcher {
  id: CallbackID | null = null;

  public beforeExitCallback(): void {
    // @ts-ignore
    DotNet.invokeMethodAsync('BionicBridgeCapacitor', 'NotifyBeforeExit', this.id);
  }
}


interface IBackgroundTask {
  beforeExit(): Promise<CallbackID>;
  finish(watcherId: CallbackID): Promise<void>;
}

export class BackgroundTaskBridge implements IBackgroundTask {
  private static watchers = new Map<CallbackID, Watcher>();

  async beforeExit(): Promise<CallbackID> {
    if (!BackgroundTask) return Promise.reject("BackgroundTask not available.");
    try {
      const watcher = new Watcher();
      const id = await BackgroundTask.beforeExit(watcher.beforeExitCallback.bind(watcher));
      watcher.id = id;
      BackgroundTaskBridge.watchers.set(id, watcher);
      return new Promise<CallbackID>(resolve => resolve(id));
    } catch (e) {
      return new Promise<CallbackID>((r, reject) => reject(e.message));
    }
  }

  async finish(watcherId: CallbackID): Promise<void> {
    if (!BackgroundTask) return Promise.reject("BackgroundTask not available.");
    try {
      BackgroundTaskBridge.watchers.delete(watcherId);
      return await BackgroundTask.finish({taskId: watcherId});
    } catch (e) {
      return new Promise<void>((r, reject) => reject(e.message));
    }
  }
}
