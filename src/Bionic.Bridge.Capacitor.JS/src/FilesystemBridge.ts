import {
  FileAppendOptions,
  FileAppendResult,
  FileDeleteOptions,
  FileDeleteResult,
  FileReadOptions,
  FileReadResult,
  FilesystemDirectory,
  FilesystemEncoding,
  FileWriteOptions,
  FileWriteResult,
  GetUriOptions,
  GetUriResult,
  MkdirOptions,
  MkdirResult,
  Plugins,
  ReaddirOptions,
  ReaddirResult,
  RmdirOptions,
  RmdirResult,
  StatOptions,
  StatResult
} from "@capacitor/core";

const {Filesystem} = Plugins;

interface IFilesystem {
  appendFile(options: FileAppendOptions): Promise<FileAppendResult>;

  deleteFile(options: FileDeleteOptions): Promise<FileDeleteResult>;

  getUri(options: GetUriOptions): Promise<GetUriResult>;

  mkdir(options: MkdirOptions): Promise<MkdirResult>;

  readFile(options: FileReadOptions): Promise<FileReadResult>;

  readdir(options: ReaddirOptions): Promise<ReaddirResult>;

  rmdir(options: RmdirOptions): Promise<RmdirResult>;

  stat(options: StatOptions): Promise<StatResult>;

  writeFile(options: FileWriteOptions): Promise<FileWriteResult>;
}

export class FilesystemBridge implements IFilesystem {
  async appendFile(options: FileAppendOptions): Promise<FileAppendResult> {
    if (!Filesystem) return Promise.reject("Filesystem not available.");
    options.encoding = FilesystemBridge.translateEncode(options.encoding);
    options.directory = FilesystemBridge.translateDirectory(options.directory);
    return await Filesystem.appendFile(options);
  }

  async deleteFile(options: FileDeleteOptions): Promise<FileDeleteResult> {
    if (!Filesystem) return Promise.reject("Filesystem not available.");
    options.directory = FilesystemBridge.translateDirectory(options.directory);
    return await Filesystem.deleteFile(options);
  }

  async getUri(options: GetUriOptions): Promise<GetUriResult> {
    if (!Filesystem) return Promise.reject("Filesystem not available.");
    options.directory = FilesystemBridge.translateDirectory(options.directory);
    return await Filesystem.getUri(options);
  }

  async mkdir(options: MkdirOptions): Promise<MkdirResult> {
    if (!Filesystem) return Promise.reject("Filesystem not available.");
    options.directory = FilesystemBridge.translateDirectory(options.directory);
    return await Filesystem.mkdir(options);
  }

  async readFile(options: FileReadOptions): Promise<FileReadResult> {
    if (!Filesystem) return Promise.reject("Filesystem not available.");
    options.encoding = FilesystemBridge.translateEncode(options.encoding);
    options.directory = FilesystemBridge.translateDirectory(options.directory);
    return await Filesystem.readFile(options);
  }

  async readdir(options: ReaddirOptions): Promise<ReaddirResult> {
    if (!Filesystem) return Promise.reject("Filesystem not available.");
    options.directory = FilesystemBridge.translateDirectory(options.directory);
    return await Filesystem.readdir(options);
  }

  async rmdir(options: RmdirOptions): Promise<RmdirResult> {
    if (!Filesystem) return Promise.reject("Filesystem not available.");
    options.directory = FilesystemBridge.translateDirectory(options.directory);
    return await Filesystem.rmdir(options);
  }

  async stat(options: StatOptions): Promise<StatResult> {
    if (!Filesystem) return Promise.reject("Filesystem not available.");
    options.directory = FilesystemBridge.translateDirectory(options.directory);
    return await Filesystem.stat(options);
  }

  async writeFile(options: FileWriteOptions): Promise<FileWriteResult> {
    console.log(options);
    if (!Filesystem) return Promise.reject("Filesystem not available.");
    options.encoding = FilesystemBridge.translateEncode(options.encoding);
    options.directory = FilesystemBridge.translateDirectory(options.directory);
    return await Filesystem.writeFile(options);
  }

  private static translateEncode(encode: any): FilesystemEncoding {
    switch (encode) {
      case 1:
        return FilesystemEncoding.ASCII;
      case 2:
        return FilesystemEncoding.UTF16;
      default:
        return FilesystemEncoding.UTF8;
    }
  }

  private static translateDirectory(directory: any): FilesystemDirectory {
    switch (directory) {
      case 1:
        return FilesystemDirectory.Documents;
      case 2:
        return FilesystemDirectory.Data;
      case 3:
        return FilesystemDirectory.Cache;
      case 4:
        return FilesystemDirectory.External;
      case 5:
        return FilesystemDirectory.ExternalStorage;
      default:
        return FilesystemDirectory.Documents;
    }
  }
}
