using System.Threading.Tasks;
using Microsoft.JSInterop;

namespace Bionic.Bridge.Capacitor {
    public static class DeviceBridge {
        private const string DeviceGetInfoFunctionName = "BionicBridge.Capacitor.Device.getInfo";

        public static Task<DeviceInfo> GetInfo() =>
            JSRuntime.Current.InvokeAsync<DeviceInfo>(DeviceGetInfoFunctionName);
    }

    public class DeviceInfo {
        public string model;
        public string platform;
        public string uuid;
        public string appVersion;
        public string osVersion;
        public string manufacturer;
        public bool isVirtual;
        public long memUsed;
        public long diskFree;
        public long diskTotal;
        public float batteryLevel;
        public bool isCharging;
    }
}
