using System.Threading.Tasks;
using Microsoft.JSInterop;

namespace Bionic.Bridge.Capacitor {
    public static class ClipboardBridge {
        private const string ClipboardWriteFunctionName = "BionicBridge.Capacitor.Clipboard.write";
        private const string ClipboardReadFunctionName = "BionicBridge.Capacitor.Clipboard.read";

        public static Task<ClipboardReadResult> Read(ClipboardReadType clipboardReadType) =>
            JSRuntime.Current.InvokeAsync<ClipboardReadResult>(ClipboardReadFunctionName, clipboardReadType);

        public static Task Write(ClipboardWrite clipboardWrite) =>
            JSRuntime.Current.InvokeAsync<object>(ClipboardWriteFunctionName, clipboardWrite);
    }

    public enum ClipboardReadType {
        String,
        Url,
        Image
    }

    public class ClipboardReadResult {
        public string value;
    }

    public class ClipboardWrite {
        public string str;
        public string image;
        public string url;
        public string label;
    }
}