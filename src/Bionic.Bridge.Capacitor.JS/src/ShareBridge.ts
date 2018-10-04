import {Plugins, ShareOptions} from "@capacitor/core";

const {Share} = Plugins;

interface IShare {
  share(options: ShareOptions): Promise<any>;
}

export class ShareBridge implements IShare {
  async share(options: ShareOptions): Promise<any> {
    if (!Share) return Promise.reject("Share not available.");
    await Share.share(options);
  }
}
