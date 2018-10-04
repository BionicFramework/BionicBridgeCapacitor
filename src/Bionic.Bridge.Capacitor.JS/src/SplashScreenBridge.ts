import {Plugins, SplashScreenHideOptions, SplashScreenShowOptions, StatusBarStyle} from "@capacitor/core";

const {SplashScreen} = Plugins;

interface ISplashScreen {
  show(options: SplashScreenShowOptions): Promise<void>;
  hide(options: SplashScreenHideOptions): Promise<void>;
}

export class SplashScreenBridge implements ISplashScreen {
  async show(options: SplashScreenShowOptions): Promise<void> {
    if (!SplashScreen) return Promise.reject("SplashScreen not available.");
    return await SplashScreen.show(options);
  }

  async hide(options: SplashScreenHideOptions): Promise<void> {
    if (!SplashScreen) return Promise.reject("SplashScreen not available.");
    return await SplashScreen.hide(options);
  }
}
