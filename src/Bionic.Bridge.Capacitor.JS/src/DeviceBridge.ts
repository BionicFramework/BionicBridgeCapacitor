import {DeviceInfo, Plugins} from '@capacitor/core';

const {Device} = Plugins;

interface IDevice {
  getInfo(): Promise<DeviceInfo>;
}

export class DeviceBridge implements IDevice {
  public async getInfo(): Promise<DeviceInfo> {
    if (!Device) return Promise.reject("Device not available.");
    try {
      const info = await Device.getInfo();
      return new Promise<DeviceInfo>(resolve => resolve(info));
    } catch (e) {
      return new Promise<DeviceInfo>((r, reject) => reject(e.message));
    }
  }
}
