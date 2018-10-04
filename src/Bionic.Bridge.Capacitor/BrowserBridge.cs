using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.JSInterop;

namespace Bionic.Bridge.Capacitor {
    public static class BrowserBridge {
        private static Dictionary<string, Action<string, string>> watchers =
            new Dictionary<string, Action<string, string>>();

        private const string BrowserCloseFunctionName = "BionicBridge.Capacitor.Browser.close";
        private const string BrowserOpenFunctionName = "BionicBridge.Capacitor.Browser.open";
        private const string BrowserPrefetchFunctionName = "BionicBridge.Capacitor.Browser.prefetch";
        private const string BrowserRemoveListenerFunctionName = "BionicBridge.Capacitor.Browser.removeListener";

        private const string BrowserListenToBrowserFinishedFunctionName =
            "BionicBridge.Capacitor.Browser.listenToBrowserFinished";

        private const string BrowserListenToBrowserPageLoadedFunctionName =
            "BionicBridge.Capacitor.Browser.listenToBrowserPageLoaded";

        public static Task Close() =>
            JSRuntime.Current.InvokeAsync<object>(BrowserCloseFunctionName);

        public static Task Open(BrowserOpenOptions options) =>
            JSRuntime.Current.InvokeAsync<object>(BrowserOpenFunctionName, options);

        public static Task Prefetch(BrowserPrefetchOptions options) =>
            JSRuntime.Current.InvokeAsync<object>(BrowserPrefetchFunctionName, options);

        public static async Task ListenToBrowserFinished(string id, Action<string, string> callback) {
            await JSRuntime.Current.InvokeAsync<object>(BrowserListenToBrowserFinishedFunctionName, id);
            watchers.Add(id, callback);
        }

        public static async Task ListenToBrowserPageLoaded(string id, Action<string, string> callback) {
            await JSRuntime.Current.InvokeAsync<object>(BrowserListenToBrowserPageLoadedFunctionName, id);
            watchers.Add(id, callback);
        }

        public static Task RemoveListener(string id) {
            if (watchers.ContainsKey(id)) watchers.Remove(id);
            return JSRuntime.Current.InvokeAsync<object>(BrowserRemoveListenerFunctionName, id);
        }

        [JSInvokable]
        public static void ReportFromBrowserListener(string watcherId, string info) {
            watchers[watcherId](watcherId, info);
        }
    }

    public class BrowserOpenOptions {
        public string url;
        public string windowName;
        public string toolbarColor;
        public string presentationStyle;
    }

    public static class PresentationStyle {
        public static string Fullscreen = "fullscreen";
        public static string Popover = "popover";
    }

    public class BrowserPrefetchOptions {
        public string[] urls;
    }
}