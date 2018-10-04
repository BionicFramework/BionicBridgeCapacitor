import {HapticsImpactStyle, Plugins} from "@capacitor/core";

const {Haptics} = Plugins;

interface IHaptics {
  vibrate(): Promise<void>;
  impact(style: number): Promise<void>;
  selectionStart(): Promise<void>;
  selectionChanged(): Promise<void>;
  selectionEnd(): Promise<void>;
}

export class HapticsBridge implements IHaptics {
  async vibrate(): Promise<void> {
    if (!Haptics) return Promise.reject("Haptics not available.");
    await Haptics.vibrate();
  }

  async impact(styleOption: number): Promise<void> {
    if (!Haptics) return Promise.reject("Haptics not available.");
    let style = HapticsImpactStyle.Light;
    switch (styleOption) {
      case 0:
        style = HapticsImpactStyle.Heavy;
        break;
      case 1:
        style = HapticsImpactStyle.Medium;
        break;
    }
    await Haptics.impact({style});
  }

  async selectionStart(): Promise<void> {
    if (!Haptics) return Promise.reject("Haptics not available.");
    await Haptics.selectionStart();
  }

  async selectionChanged(): Promise<void> {
    if (!Haptics) return Promise.reject("Haptics not available.");
    await Haptics.selectionChanged();
  }

  async selectionEnd(): Promise<void> {
    if (!Haptics) return Promise.reject("Haptics not available.");
    await Haptics.selectionEnd();
  }
}
