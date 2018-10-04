using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.JSInterop;

namespace Bionic.Bridge.Capacitor {
    public static class NetworkBridge {
        private static Dictionary<string, Action<NetworkStatus>> watchers =
            new Dictionary<string, Action<NetworkStatus>>();

        private const string NetworkGetStatusFunctionName = "BionicBridge.Capacitor.Network.getStatus";
        private const string NetworkAddListenerFunctionName = "BionicBridge.Capacitor.Network.addListener";
        private const string NetworkRemoveListenerFunctionName = "BionicBridge.Capacitor.Network.removeListener";

        public static Task<NetworkStatus> GetStatus() =>
            JSRuntime.Current.InvokeAsync<NetworkStatus>(NetworkGetStatusFunctionName);

        public static async Task AddListener(string id, Action<NetworkStatus> callback) {
            await JSRuntime.Current.InvokeAsync<string>(NetworkAddListenerFunctionName, id);
            watchers.Add(id, callback);
        }

        public static Task RemoveListener(string id) {
            if (watchers.ContainsKey(id)) watchers.Remove(id);
            return JSRuntime.Current.InvokeAsync<object>(NetworkRemoveListenerFunctionName, id);
        }

        [JSInvokable]
        public static void ReportNetworkStatus(string id, NetworkStatus status) => watchers[id](status);
    }

    public class NetworkStatus {
        public bool connected;
        public string connectionType;
    }
}