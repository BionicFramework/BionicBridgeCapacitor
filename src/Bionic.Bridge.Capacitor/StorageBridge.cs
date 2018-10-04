using System.Threading.Tasks;
using Microsoft.JSInterop;

namespace Bionic.Bridge.Capacitor {
    public static class StorageBridge {
        private const string StorageClearFunctionName = "BionicBridge.Capacitor.Storage.clear";
        private const string StorageGetFunctionName = "BionicBridge.Capacitor.Storage.get";
        private const string StorageSetFunctionName = "BionicBridge.Capacitor.Storage.set";
        private const string StorageKeysFunctionName = "BionicBridge.Capacitor.Storage.keys";
        private const string StorageRemoveFunctionName = "BionicBridge.Capacitor.Storage.remove";

        public static Task Clear() =>
            JSRuntime.Current.InvokeAsync<object>(StorageClearFunctionName);

        public static Task<T> Get<T>(string key) =>
            JSRuntime.Current.InvokeAsync<T>(StorageGetFunctionName, key);

        public static Task Set<T>(string key, T value) =>
            JSRuntime.Current.InvokeAsync<object>(StorageSetFunctionName, key, value);

        public static Task<string[]> Keys() =>
            JSRuntime.Current.InvokeAsync<string[]>(StorageKeysFunctionName);

        public static Task Remove(string key) =>
            JSRuntime.Current.InvokeAsync<object>(StorageRemoveFunctionName, key);
    }
}