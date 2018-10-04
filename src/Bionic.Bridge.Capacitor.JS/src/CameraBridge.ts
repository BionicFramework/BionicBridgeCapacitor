import {Capacitor, CameraOptions, CameraPhoto, Plugins} from '@capacitor/core';

const {Camera} = Plugins;

interface ICamera {
  getPhoto(options: CameraOptions): Promise<CameraPhoto>;
}

export class CameraBridge implements ICamera {
  public async getPhoto(options: CameraOptions): Promise<CameraPhoto> {
    if (!Camera) return Promise.reject("Camera not available.");
    try {
      const image = await Camera.getPhoto(options);
      return new Promise<CameraPhoto>(resolve => resolve(image));
    } catch (e) {
      return new Promise<CameraPhoto>((r, reject) => reject(e.message));
    }
  }
}
