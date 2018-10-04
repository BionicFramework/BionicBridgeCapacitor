using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.JSInterop;

namespace Bionic.Bridge.Capacitor {
    public static class AppBridge {
        private static Dictionary<string, Action<AppState>> stateWatchers = new Dictionary<string, Action<AppState>>();

        private static Dictionary<string, Action<AppUrlOpen>> urlOpenWatchers =
            new Dictionary<string, Action<AppUrlOpen>>();

        private static Dictionary<string, Action<AppRestoredResult>> restoredResultWatchers =
            new Dictionary<string, Action<AppRestoredResult>>();

        private static Dictionary<string, Action<AppUrlOpen>> backButtonWatchers =
            new Dictionary<string, Action<AppUrlOpen>>();

        private const string AppCanOpenUrlFunctionName = "BionicBridge.Capacitor.App.canOpenUrl";
        private const string AppExitFunctionName = "BionicBridge.Capacitor.App.exitApp";
        private const string AppGetLaunchUrlFunctionName = "BionicBridge.Capacitor.App.getLaunchUrl";
        private const string AppOpenUrlFunctionName = "BionicBridge.Capacitor.App.openUrl";
        private const string AppStateChangeFunctionName = "BionicBridge.Capacitor.App.addAppStateChangeListener";
        private const string AppAppUrlOpenFunctionName = "BionicBridge.Capacitor.App.addAppUrlOpenListener";
        private const string AppRestoredResultFunctionName = "BionicBridge.Capacitor.App.addAppRestoredResultListener";
        private const string AppBackButtonFunctionName = "BionicBridge.Capacitor.App.addBackButtonListener";
        private const string AppRemoveListenerFunctionName = "BionicBridge.Capacitor.App.removeListener";

        public static Task<bool> CanOpenUrl(string url) =>
            JSRuntime.Current.InvokeAsync<bool>(AppCanOpenUrlFunctionName, url);

        public static Task ExitApp() =>
            JSRuntime.Current.InvokeAsync<object>(AppExitFunctionName);

        public static Task<string> GetLaunchUrl() =>
            JSRuntime.Current.InvokeAsync<string>(AppGetLaunchUrlFunctionName);

        public static Task<bool> OpenUrl(string url) =>
            JSRuntime.Current.InvokeAsync<bool>(AppOpenUrlFunctionName, url);

        public static async Task AddAppStateChangeListener(string id, Action<AppState> callback) {
            await JSRuntime.Current.InvokeAsync<object>(AppStateChangeFunctionName, id);
            stateWatchers.Add(id, callback);
        }

        public static async Task AddAppUrlOpenListener(string id, Action<AppUrlOpen> callback) {
            await JSRuntime.Current.InvokeAsync<object>(AppAppUrlOpenFunctionName, id);
            urlOpenWatchers.Add(id, callback);
        }

        public static async Task AddAppRestoredResultListener(string id, Action<AppRestoredResult> callback) {
            await JSRuntime.Current.InvokeAsync<object>(AppRestoredResultFunctionName, id);
            restoredResultWatchers.Add(id, callback);
        }

        public static async Task AddAppBackButtonListener(string id, Action<AppUrlOpen> callback) {
            await JSRuntime.Current.InvokeAsync<object>(AppBackButtonFunctionName, id);
            backButtonWatchers.Add(id, callback);
        }

        public static Task RemoveListener(string id) {
            if (stateWatchers.ContainsKey(id)) stateWatchers.Remove(id);
            else if (urlOpenWatchers.ContainsKey(id)) urlOpenWatchers.Remove(id);
            else if (restoredResultWatchers.ContainsKey(id)) restoredResultWatchers.Remove(id);
            else if (backButtonWatchers.ContainsKey(id)) backButtonWatchers.Remove(id);
            return JSRuntime.Current.InvokeAsync<object>(AppRemoveListenerFunctionName, id);
        }

        [JSInvokable]
        public static void ReportAppStateChange(string id, AppState state) =>
            stateWatchers[id](state);

        [JSInvokable]
        public static void ReportAppUrlOpen(string id, AppUrlOpen data) =>
            urlOpenWatchers[id](data);

        [JSInvokable]
        public static void ReportAppRestoredResult(string id, AppRestoredResult data) =>
            restoredResultWatchers[id](data);

        [JSInvokable]
        public static void ReportBackButton(string id, AppUrlOpen data) =>
            backButtonWatchers[id](data);
    }

    public class AppState {
        public bool isActive;
    }

    public class AppUrlOpen {
        public string url;
        public object iosSourceApplication;
        public bool iosOpenInPlace;
    }

    public class AppRestoredResult {
        public string pluginId;
        public string methodName;
        public string data;
    }
}