using System.Threading.Tasks;
using Microsoft.JSInterop;

namespace Bionic.Bridge.Capacitor {
    public static class FilesystemBridge {
        private const string FilesystemAppendFileFunctionName = "BionicBridge.Capacitor.Filesystem.appendFile";
        private const string FilesystemDeleteFileFunctionName = "BionicBridge.Capacitor.Filesystem.deleteFile";
        private const string FilesystemGetUriFunctionName = "BionicBridge.Capacitor.Filesystem.getUri";
        private const string FilesystemMkdirFileFunctionName = "BionicBridge.Capacitor.Filesystem.mkdir";
        private const string FilesystemReadDirFunctionName = "BionicBridge.Capacitor.Filesystem.readdir";
        private const string FilesystemReadFileFunctionName = "BionicBridge.Capacitor.Filesystem.readFile";
        private const string FilesystemRmdirFileFunctionName = "BionicBridge.Capacitor.Filesystem.rmdir";
        private const string FilesystemStatFunctionName = "BionicBridge.Capacitor.Filesystem.stat";
        private const string FilesystemWriteFileFunctionName = "BionicBridge.Capacitor.Filesystem.writeFile";

        public static Task<FileAppendResult> AppendFile(FileAppendOptions options) =>
            JSRuntime.Current.InvokeAsync<FileAppendResult>(FilesystemAppendFileFunctionName, options);

        public static Task<FileDeleteResult> DeleteFile(FileDeleteOptions options) =>
            JSRuntime.Current.InvokeAsync<FileDeleteResult>(FilesystemDeleteFileFunctionName, options);

        public static Task<GetUriResult> GetUri(GetUriOptions options) =>
            JSRuntime.Current.InvokeAsync<GetUriResult>(FilesystemGetUriFunctionName, options);

        public static Task<MkdirResult> Mkdir(MkdirOptions options) =>
            JSRuntime.Current.InvokeAsync<MkdirResult>(FilesystemMkdirFileFunctionName, options);

        public static Task<FileReadResult> ReadFile(FileReadOptions options) =>
            JSRuntime.Current.InvokeAsync<FileReadResult>(FilesystemReadFileFunctionName, options);

        public static Task<ReaddirResult> ReadDir(ReaddirOptions options) =>
            JSRuntime.Current.InvokeAsync<ReaddirResult>(FilesystemReadDirFunctionName, options);

        public static Task<RmdirResult> Rmdir(RmdirOptions options) =>
            JSRuntime.Current.InvokeAsync<RmdirResult>(FilesystemRmdirFileFunctionName, options);

        public static Task<StatResult> Stat(StatOptions options) =>
            JSRuntime.Current.InvokeAsync<StatResult>(FilesystemStatFunctionName, options);

        public static Task<FileWriteResult> WriteFile(FileWriteOptions options) =>
            JSRuntime.Current.InvokeAsync<FileWriteResult>(FilesystemWriteFileFunctionName, options);
    }

    public class FileAppendOptions: FileWriteOptions {}

    public class FileWriteOptions: FileReadOptions {
        public string data;
    }

    public class FileReadOptions: FileDeleteOptions {
        public FilesystemEncoding encoding;
    }

    public class GetUriOptions: FileDeleteOptions { }
    public class ReaddirOptions: FileDeleteOptions { }
    public class RmdirOptions: FileDeleteOptions { }
    public class StatOptions: FileDeleteOptions { }

    public class FileDeleteOptions {
        public string path;
        public FilesystemDirectory directory;
    }

    public class MkdirOptions : FileDeleteOptions {
        public bool createIntermediateDirectories;
    }

    public class GetUriResult {
        public string uri;
    }

    public class FileAppendResult { }

    public class FileDeleteResult { }

    public class MkdirResult { }

    public class FileWriteResult { }

    public class FileReadResult {
        public string data;
    }

    public class ReaddirResult {
        public string[] files;
    }

    public class RmdirResult { }

    public class StatResult {
        public string type;
        public long size;
        public long ctime;
        public long mtime;
        public string uri;
    }

    public enum FilesystemDirectory {
        Application,
        Documents,
        Data,
        Cache,
        External,
        ExternalStorage
    }

    public enum FilesystemEncoding {
        UTF8,
        ASCII,
        UTF16,
    }
}