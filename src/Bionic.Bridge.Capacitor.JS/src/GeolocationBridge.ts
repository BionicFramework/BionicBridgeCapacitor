import {CallbackID, GeolocationOptions, GeolocationPosition, Plugins} from '@capacitor/core';

const {Geolocation} = Plugins;

class Watcher {
  id: CallbackID | null = null;

  public geolocationCallback(position: GeolocationPosition, err?: any): void {
    if (err) {
      console.log(`Got position error: ${err.message ? err.message : err}`);
      return;
    }
    // @ts-ignore
    DotNet.invokeMethodAsync('BionicBridgeCapacitor', 'ReportNewPosition', this.id, new GeoPos(position));
  }
}

class GeoCords {
  latitude: number;
  longitude: number;
  accuracy: number;
  altitude?: number;
  altitudeAccuracy?: number;
  speed?: number;
  heading?: number;

  constructor(coords: any) {
    this.latitude = coords.latitude ? coords.latitude : null;
    this.longitude = coords.longitude ? coords.longitude : null;
    this.accuracy = coords.accuracy ? coords.accuracy : null;
    this.altitude = coords.altitude ? coords.altitude : null;
    this.altitudeAccuracy = coords.altitudeAcuracy ? coords.altitudeAcuracy : null;
    this.speed = coords.speed ? coords.speed : null;
    this.heading = coords.heading ? coords.heading : null;
  }
}

class GeoPos {
  timestamp: number;
  coords: GeoCords;
  constructor(position: any) {
    this.timestamp = position.timestamp ? position.timestamp : null;
    this.coords = new GeoCords(position.coords);
  }
}


interface IGeolocation {
  clearWatch(id: string): Promise<void>;
  getCurrentPosition(options?: GeolocationOptions): Promise<GeoPos>;
  watchPosition(options: GeolocationOptions): Promise<CallbackID>;
}

export class GeolocationBridge implements IGeolocation {
  private static watchers = new Map<CallbackID, Watcher>();

  public async clearWatch(id: string): Promise<void> {
    if (!Geolocation) return Promise.reject("Geolocation not available.");
    try {
      await Geolocation.clearWatch({ id });
      GeolocationBridge.watchers.delete(id);
      return new Promise<void>(resolve => resolve());
    } catch (e) {
      return new Promise<void>((r, reject) => reject(e.message));
    }
  }

  public async getCurrentPosition(options?: GeolocationOptions): Promise<GeoPos> {
    if (!Geolocation) return Promise.reject("Geolocation not available.");
    try {
      const position = new GeoPos(await Geolocation.getCurrentPosition());
      return new Promise<GeoPos>(resolve => resolve(position));
    } catch (e) {
      return new Promise<GeoPos>((r, reject) => reject(e.message));
    }
  }

  public async watchPosition(options: GeolocationOptions): Promise<CallbackID> {
    if (!Geolocation) return Promise.reject("Geolocation not available.");
    try {
      const watcher = new Watcher();
      const id = await Geolocation.watchPosition(options, watcher.geolocationCallback.bind(watcher));
      watcher.id = id;
      GeolocationBridge.watchers.set(id, watcher);
      return new Promise<CallbackID>(resolve => resolve(id));
    } catch (e) {
      return new Promise<CallbackID>((r, reject) => reject(e.message));
    }
  }
}
