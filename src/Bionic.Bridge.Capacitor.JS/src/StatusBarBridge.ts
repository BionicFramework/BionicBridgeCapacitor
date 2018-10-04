import {Plugins, StatusBarStyle} from "@capacitor/core";

const {StatusBar} = Plugins;

interface IStatusBar {
  show(): Promise<void>;
  hide(): Promise<void>;
  setBackgroundColor(color: string): Promise<void>;
  setStyle(style: number): Promise<void>
}

export class StatusBarBridge implements IStatusBar {
  async show(): Promise<void> {
    if (!StatusBar) return Promise.reject("StatusBar not available.");
    return await StatusBar.show();
  }

  async hide(): Promise<void> {
    if (!StatusBar) return Promise.reject("StatusBar not available.");
    return await StatusBar.hide();
  }

  async setBackgroundColor(color: string): Promise<void> {
    if (!StatusBar) return Promise.reject("StatusBar not available.");
    return await StatusBar.setBackgroundColor({color});
  }

  async setStyle(style: number): Promise<void> {
    if (!StatusBar) return Promise.reject("StatusBar not available.");
    return await StatusBar.setStyle({style: style === 0 ? StatusBarStyle.Dark : StatusBarStyle.Light});
  }
}
