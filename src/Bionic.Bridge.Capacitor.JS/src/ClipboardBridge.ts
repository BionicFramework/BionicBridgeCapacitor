import {ClipboardReadResult, ClipboardWrite, Plugins} from "@capacitor/core";

const {Clipboard} = Plugins;

interface IClipboard {
  read(type: number): Promise<ClipboardReadResult>;

  write(options: ClipboardWrite): Promise<void>;
}

export class ClipboardBridge implements IClipboard {
  async read(type: number): Promise<ClipboardReadResult> {
    if (!Clipboard) return Promise.reject("Clipboard not available.");
    return await Clipboard.read();
  }

  async write(data: any): Promise<void> {
    if (!Clipboard) return Promise.reject("Clipboard not available.");
    await Clipboard.write({string: data.str, image: data.image, url: data.url, label: data.label});
  }

  private static translateClipboardType(type: number): 'string' | 'url' | 'image' {
    switch (type) {
      case 1:
        return 'url';
      case 2:
        return 'image';
      default:
        return 'string';
    }
  }
}
