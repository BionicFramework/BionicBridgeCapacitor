using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.JSInterop;

namespace Bionic.Bridge.Capacitor {
    public static class AccessibilityBridge {
        private static Dictionary<string, Action<bool>> watchers = new Dictionary<string, Action<bool>>();

        private const string AccessibilityIsScreenReaderEnabledFunctionName = "BionicBridge.Capacitor.Accessibility.isScreenReaderEnabled";
        private const string AccessibilitySpeakFunctionName = "BionicBridge.Capacitor.Accessibility.speak";
        private const string AccessibilityAddListenerFunctionName = "BionicBridge.Capacitor.Accessibility.addListener";
        private const string AccessibilityRemoveListenerFunctionName = "BionicBridge.Capacitor.Accessibility.removeListener";

        public static Task<bool> IsScreenReaderEnabled() =>
            JSRuntime.Current.InvokeAsync<bool>(AccessibilityIsScreenReaderEnabledFunctionName);

        public static Task Speak(AccessibilitySpeakOptions options) =>
            JSRuntime.Current.InvokeAsync<object>(AccessibilitySpeakFunctionName, options);

        public static async Task AddListener(string id, Action<bool> callback) {
            await JSRuntime.Current.InvokeAsync<object>(AccessibilityAddListenerFunctionName, id);
            watchers.Add(id, callback);
        }

        public static Task RemoveListener(string id) {
            if (watchers.ContainsKey(id)) watchers.Remove(id);
            return JSRuntime.Current.InvokeAsync<object>(AccessibilityRemoveListenerFunctionName, id);
        }

        [JSInvokable]
        public static void ReportAccessibilityScreenReaderStateChange(string id, bool isScreenReaderEnabled) =>
            watchers[id](isScreenReaderEnabled);
    }

    public class AccessibilitySpeakOptions {
        public string value;
        public string language;
    }
}