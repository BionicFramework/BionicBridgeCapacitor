import {MotionEventResult, MotionOrientationEventResult, PluginListenerHandle, Plugins} from "@capacitor/core";
import {Deployment} from "./Deployment";

const {Motion} = Plugins;

class Watcher {
  id: string | null = null;
  handler: PluginListenerHandle | null = null;
  type: 'deviceorientation' | 'devicemotion' = 'deviceorientation';
  eventHandler: any;

  public remove(): void {
    if (this.handler) {
      this.handler.remove();
      this.handler = null;
    }
  }

  public motionAccelListener(event: MotionEventResult | DeviceMotionEvent): void {
    // @ts-ignore
    DotNet.invokeMethodAsync('BionicBridgeCapacitor', 'ReportMotionAccel', this.id, {
      acceleration: event.acceleration ? {
        x: event.acceleration.x,
        y: event.acceleration.y,
        z: event.acceleration.z,
      } : null,
      accelerationIncludingGravity: event.accelerationIncludingGravity ? {
        x: event.accelerationIncludingGravity.x,
        y: event.accelerationIncludingGravity.y,
        z: event.accelerationIncludingGravity.z,
      } : null,
      rotationRate: event.rotationRate ? {
        alpha: event.rotationRate.alpha,
        beta: event.rotationRate.beta,
        gamma: event.rotationRate.gamma,
      } : null,
      interval: event.interval
    });
  }

  public motionOrientationListener(event: MotionOrientationEventResult | DeviceOrientationEvent): void {
    // @ts-ignore
    DotNet.invokeMethodAsync('BionicBridgeCapacitor', 'ReportMotionOrientation',
      this.id,
      {
        alpha: event["alpha"],
        beta: event["beta"],
        gamma: event["gamma"]
      });
  }
}

interface IMotion {
  getOrientation(): Promise<number>;

  startOrientationChangeListener(): Promise<void>;

  stopOrientationChangeListener(): Promise<void>;

  addAccelListener(id: string): Promise<void>;

  addOrientationListener(id: string): Promise<void>;

  removeListener(id: string): Promise<void>;
}

function onOrientationChange(): void {
  const value = typeof window.orientation === 'string' ? parseInt(window.orientation) : window.orientation;
  // @ts-ignore
  DotNet.invokeMethodAsync('BionicBridgeCapacitor', 'OnOrientationChange', value);
}

export class MotionBridge implements IMotion {
  private static watchers = new Map<string, Watcher>();

  async getOrientation(): Promise<number> {
    const value = typeof window.orientation === 'string' ? parseInt(window.orientation) : window.orientation;
    return Promise.resolve(value);
  };

  async startOrientationChangeListener(): Promise<void> {
    addEventListener("orientationchange", onOrientationChange);
  }

  async stopOrientationChangeListener(): Promise<void> {
    removeEventListener("orientationchange", onOrientationChange);
  }

  async addAccelListener(id: string): Promise<void> {
    try {
      const watcher = new Watcher();
      watcher.id = id;
      watcher.eventHandler = watcher.motionAccelListener.bind(watcher);
      if (await Deployment.isWeb()) {
        watcher.type = 'devicemotion';
        if (!DeviceMotionEvent) return new Promise<void>((r, reject) => reject('Detected web deployment but DeviceMotionEvent is not available'));
        addEventListener('devicemotion', watcher.eventHandler, false);
      } else {
        if (!Motion) return Promise.reject<void>("Motion not available.");
        watcher.handler = await Motion.addListener('accel', watcher.eventHandler);
      }
      MotionBridge.watchers.set(id, watcher);
      return new Promise<void>(resolve => resolve());
    } catch (e) {
      return new Promise<void>((r, reject) => reject(e.message));
    }
  }

  async addOrientationListener(id: string): Promise<void> {
    try {
      const watcher = new Watcher();
      watcher.id = id;
      watcher.eventHandler = watcher.motionOrientationListener.bind(watcher);
      if (await Deployment.isWeb()) {
        watcher.type = 'deviceorientation';
        if (!DeviceOrientationEvent) return new Promise<void>((r, reject) => reject('Detected web deployment but DeviceOrientationEvent is not available'));
        addEventListener('deviceorientation', watcher.eventHandler, false);
      } else {
        if (!Motion) return Promise.reject<void>("Motion not available.");
        watcher.handler = await Motion.addListener('orientation', watcher.eventHandler);
      }
      MotionBridge.watchers.set(id, watcher);
      return new Promise<void>(resolve => resolve());
    } catch (e) {
      return new Promise<void>((r, reject) => reject(e.message));
    }
  }

  async removeListener(id: string): Promise<void> {
    try {
      const watcher = MotionBridge.watchers.get(id);
      if (watcher) {
        if (await Deployment.isWeb()) {
          removeEventListener(watcher.type, watcher.eventHandler);
        } else {
          watcher.remove();
        }
        MotionBridge.watchers.delete(id);
      }
      return new Promise<void>(resolve => resolve());
    } catch (e) {
      return new Promise<void>((r, reject) => reject(e.message));
    }
  }
}
