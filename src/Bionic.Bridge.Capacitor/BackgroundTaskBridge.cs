using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.JSInterop;

namespace Bionic.Bridge.Capacitor {
    public static class BackgroundTaskBridge {
        private static Dictionary<string, Action> watchers = new Dictionary<string, Action>();

        private const string BGBeforeExitFunctionName = "BionicBridge.Capacitor.BackgroundTask.beforeExit";
        private const string BGFinishFunctionName = "BionicBridge.Capacitor.BackgroundTask.finish";

        public static async Task<string> BeforeExit(Action callback) {
            var id = await JSRuntime.Current.InvokeAsync<string>(BGBeforeExitFunctionName);
            watchers.Add(id, callback);
            return id;
        }

        public static async Task Finish(string id) {
            if (watchers.ContainsKey(id)) watchers.Remove(id);
            await JSRuntime.Current.InvokeAsync<string>(BGFinishFunctionName, id);
        }

        [JSInvokable]
        public static void NotifyBeforeExit(string watcherId) {
            watchers[watcherId]();
        }
    }
}