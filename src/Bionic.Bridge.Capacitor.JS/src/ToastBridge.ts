import {Plugins, ToastShowOptions} from "@capacitor/core";

const {Toast} = Plugins;

interface IToast {
  show(options: ToastShowOptions): Promise<void>;
}

export class ToastBridge implements IToast {
  async show(options: ToastShowOptions): Promise<void> {
    if (!Toast) return Promise.reject("Toast not available.");
    await Toast.show(options);
  }
}
