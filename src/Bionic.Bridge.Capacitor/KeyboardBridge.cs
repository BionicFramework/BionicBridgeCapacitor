using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.JSInterop;

namespace Bionic.Bridge.Capacitor {
    public static class KeyboardBridge {
        private static Dictionary<KeyboardEvent, IList<Action<string>>> watchers;

        private const string KeyboardEventsFunctionName = "BionicBridge.Capacitor.Keyboard.registerEventListeners";
        private const string KeyboardShowFunctionName = "BionicBridge.Capacitor.Keyboard.show";
        private const string KeyboardHideFunctionName = "BionicBridge.Capacitor.Keyboard.hide";
        private const string KeyboardSetAccessoryBarVisibleFunctionName =
            "BionicBridge.Capacitor.Keyboard.setAccessoryBarVisible";

        public static Task<object> RegisterEventListeners() {
            if (watchers != null) return Task.FromResult<object>(null);

            watchers = new Dictionary<KeyboardEvent, IList<Action<string>>> {
                {KeyboardEvent.KeyboardWillShow, new List<Action<string>>()},
                {KeyboardEvent.KeyboardDidShow, new List<Action<string>>()},
                {KeyboardEvent.KeyboardWillHide, new List<Action<string>>()},
                {KeyboardEvent.KeyboardDidHide, new List<Action<string>>()}
            };

            return JSRuntime.Current.InvokeAsync<object>(KeyboardEventsFunctionName);

        }

        public static Task<object> Show() => JSRuntime.Current.InvokeAsync<object>(KeyboardShowFunctionName);

        public static Task<object> Hide() => JSRuntime.Current.InvokeAsync<object>(KeyboardHideFunctionName);

        public static Task<object> SetAccessoryBarVisible(bool isVisible) =>
            JSRuntime.Current.InvokeAsync<object>(KeyboardSetAccessoryBarVisibleFunctionName, isVisible);

        [JSInvokable]
        public static void KeyboardWillShow(string keyboardEventJSon) {
            foreach (var action in watchers[KeyboardEvent.KeyboardWillShow]) {
                action(keyboardEventJSon);
            }
        }

        [JSInvokable]
        public static void KeyboardDidShow(string keyboardEventJSon) {
            foreach (var action in watchers[KeyboardEvent.KeyboardDidShow]) {
                action(keyboardEventJSon);
            }
        }

        [JSInvokable]
        public static void KeyboardWillHide() {
            foreach (var action in watchers[KeyboardEvent.KeyboardWillHide]) {
                action(null);
            }
        }

        [JSInvokable]
        public static void KeyboardDidHide() {
            foreach (var action in watchers[KeyboardEvent.KeyboardDidHide]) {
                action(null);
            }
        }

        public static void AddEventListener(KeyboardEvent eventType, Action<string> callback) {
            if (watchers == null) RegisterEventListeners();
            watchers[eventType].Add(callback);
        }

        public static void RemoveEventListener(KeyboardEvent eventType, Action<string> callback) {
            if (watchers == null) return;
            var clone = new List<Action<string>>(watchers[eventType]);
            clone.Remove(callback);
            watchers[eventType] = clone;
        }
    }

    public enum KeyboardEvent {
        KeyboardWillShow,
        KeyboardDidShow,
        KeyboardWillHide,
        KeyboardDidHide
    }
}