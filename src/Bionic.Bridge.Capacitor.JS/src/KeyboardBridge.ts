import {Plugins} from '@capacitor/core';

const {Keyboard} = Plugins;

interface IKeyboard {
  show(): Promise<void>;

  hide(): Promise<void>;

  setAccessoryBarVisible(isVisible: boolean): Promise<void>;

  registerEventListeners(): Promise<void>;
}

export class KeyboardBridge implements IKeyboard {
  public async show(): Promise<void> {
    if (!Keyboard) return Promise.reject("Keyboard not available.");
    try {
      await Keyboard.show();
      return new Promise<void>(resolve => resolve());
    } catch (e) {
      return new Promise<void>((r, reject) => reject(e.message));
    }
  }

  public async hide(): Promise<void> {
    if (!Keyboard) return Promise.reject("Keyboard not available.");
    try {
      await Keyboard.hide();
      return new Promise<void>(resolve => resolve());
    } catch (e) {
      return new Promise<void>((r, reject) => reject(e.message));
    }
  }

  public async setAccessoryBarVisible(isVisible: boolean): Promise<void> {
    if (!Keyboard) return Promise.reject("Keyboard not available.");
    try {
      await Keyboard.setAccessoryBarVisible({isVisible});
      return new Promise<void>(resolve => resolve());
    } catch (e) {
      return new Promise<void>((r, reject) => reject(e.message));
    }
  }

  public async registerEventListeners(): Promise<void> {
    if (!Keyboard || !window) return Promise.reject("Keyboard not available.");
    try {
      window.addEventListener('keyboardWillShow', (e) => {
        // @ts-ignore
        DotNet.invokeMethodAsync('BionicBridgeCapacitor', 'KeyboardWillShow', JSON.stringify(e));
      });

      window.addEventListener('keyboardDidShow', (e) => {
        // @ts-ignore
        DotNet.invokeMethodAsync('BionicBridgeCapacitor', 'KeyboardDidShow', JSON.stringify(e));
      });

      window.addEventListener('keyboardWillHide', () => {
        // @ts-ignore
        DotNet.invokeMethodAsync('BionicBridgeCapacitor', 'KeyboardWillHide');
      });

      window.addEventListener('keyboardDidHide', () => {
        // @ts-ignore
        DotNet.invokeMethodAsync('BionicBridgeCapacitor', 'KeyboardDidHide');
      });

      return new Promise<void>(resolve => resolve());
    } catch (e) {
      return new Promise<void>((r, reject) => reject(e.message));
    }
  }
}
