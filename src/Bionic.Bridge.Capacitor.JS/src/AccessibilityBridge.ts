import {AccessibilitySpeakOptions, PluginListenerHandle, Plugins, ScreenReaderEnabledResult} from "@capacitor/core";

const {Accessibility} = Plugins;

class Watcher {
  id: string | null = null;
  handler: PluginListenerHandle | null = null;

  public remove(): void {
    if (this.handler) {
      this.handler.remove();
      this.handler = null;
    }
  }

  public accessibilityScreenReaderStateChangeListener(state: ScreenReaderEnabledResult): void {
    // @ts-ignore
    DotNet.invokeMethodAsync(
      'BionicBridgeCapacitor',
      'ReportAccessibilityScreenReaderStateChange',
      this.id,
      state && state.value ? state.value : false
    );
  }
}

interface IAccessibility {
  isScreenReaderEnabled(): Promise<boolean>;

  speak(options: AccessibilitySpeakOptions): Promise<void>;

  addListener(id: string): Promise<void>

  removeListener(id: string): Promise<void>;
}

export class AccessibilityBridge implements IAccessibility {
  private static watchers = new Map<string, Watcher>();

  async isScreenReaderEnabled(): Promise<boolean> {
    if (!Accessibility) return Promise.reject("App not available.");
    const result = await Accessibility.isScreenReaderEnabled();
    return result ? result.value : false;
  }

  async speak(options: AccessibilitySpeakOptions): Promise<void> {
    if (!Accessibility) return Promise.reject<void>("App not available.");
    await Accessibility.speak(options);
  }

  async addListener(id: string): Promise<void> {
    if (!Accessibility) return Promise.reject<void>("App not available.");

    try {
      const watcher = new Watcher();
      watcher.id = id;
      watcher.handler = await Accessibility.addListener(
        "accessibilityScreenReaderStateChange",
        watcher.accessibilityScreenReaderStateChangeListener.bind(watcher)
      );
      AccessibilityBridge.watchers.set(id, watcher);
      return new Promise<void>(resolve => resolve());
    } catch (e) {
      return new Promise<void>((r, reject) => reject(e.message));
    }
  }

  async removeListener(id: string): Promise<void> {
    try {
      const watcher = AccessibilityBridge.watchers.get(id);
      if (watcher && watcher.handler) {
        watcher.remove();
        AccessibilityBridge.watchers.delete(id);
      }
      return new Promise<void>(resolve => resolve());
    } catch (e) {
      return new Promise<void>((r, reject) => reject(e.message));
    }
  }
}
