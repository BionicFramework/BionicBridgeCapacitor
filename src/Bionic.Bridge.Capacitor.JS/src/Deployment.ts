import {Plugins} from "@capacitor/core";

const {Device} = Plugins;

export class Deployment {
  static isWeb(): Promise<boolean> {
    return Deployment.is('web');
  }

  static isAndroid(): Promise<boolean> {
    return Deployment.is('android');
  }

  static isIOS(): Promise<boolean> {
    return Deployment.is('ios');
  }

  private static async is(deployment: 'web' | 'ios' | 'android'): Promise<boolean> {
    if (!Device) return Promise.resolve(false);
    try {
      const info = await Device.getInfo();
      return Promise.resolve(info.platform === deployment);
    } catch (e) {
      return Promise.reject(e.message);
    }
  }
}
